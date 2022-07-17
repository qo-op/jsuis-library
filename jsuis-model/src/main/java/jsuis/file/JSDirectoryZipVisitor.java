package jsuis.file;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.AccessDeniedException;
import java.nio.file.FileAlreadyExistsException;
import java.nio.file.FileSystem;
import java.nio.file.FileSystems;
import java.nio.file.FileVisitResult;
import java.nio.file.Files;
import java.nio.file.NoSuchFileException;
import java.nio.file.NotDirectoryException;
import java.nio.file.Path;
import java.nio.file.PathMatcher;
import java.nio.file.SimpleFileVisitor;
import java.nio.file.attribute.BasicFileAttributes;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

/**
 * Directory zip visitor
 * 
 * @author Yassuo Toda
 */
public class JSDirectoryZipVisitor extends SimpleFileVisitor<Path> {

	public static void zip(File source, String include, String exclude, File destination, boolean overwrite, boolean preserve) throws IOException {
		if (Files.notExists(source.toPath())) {
			throw new NoSuchFileException(source.getAbsolutePath());
		} else if (!Files.exists(source.toPath())) {
			throw new AccessDeniedException(source.getAbsolutePath());
		} else if (!Files.isDirectory(source.toPath())) {
			throw new NotDirectoryException(source.getAbsolutePath());
		}
		if (Files.exists(destination.toPath())) {
			if (Files.isDirectory(destination.toPath())) {
				throw new FileNotFoundException(destination.getAbsolutePath());
			} else if (!overwrite) {
				throw new FileAlreadyExistsException(destination.getAbsolutePath());
			}
		}
		try (ZipOutputStream zipOutputStream = new ZipOutputStream(Files.newOutputStream(destination.toPath()))) {
			new JSDirectoryZipVisitor(source, include, exclude, zipOutputStream, preserve).zip();
		}
	}
	
	private Path source;
	private PathMatcher fileIncludePatchMatcher;
	private PathMatcher directoryIncludePatchMatcher;
	private PathMatcher fileExcludePatchMatcher;
	private PathMatcher directoryExcludePatchMatcher;
	private ZipOutputStream zipOutputStream;
	private boolean preserve;
	
	private JSDirectoryZipVisitor(File source, String include, String exclude, ZipOutputStream zipOutputStream, boolean preserve) throws IOException {
		this.source = source.toPath();
		FileSystem fileSystem = FileSystems.getDefault();
		fileIncludePatchMatcher = fileSystem.getPathMatcher("glob:" + include);
		directoryIncludePatchMatcher = fileSystem.getPathMatcher("glob:" + include.replaceAll("/$", ""));
		if (exclude != null && !exclude.isEmpty()) {
			fileExcludePatchMatcher = fileSystem.getPathMatcher("glob:" + exclude);
			directoryExcludePatchMatcher = fileSystem.getPathMatcher("glob:" + exclude.replaceAll("/$", ""));
		}
		this.zipOutputStream = zipOutputStream;
		this.preserve = preserve;
	}
	
	public void zip() throws IOException {
		Files.walkFileTree(source, this);
	}
	
	@Override
	public FileVisitResult preVisitDirectory(Path dir, BasicFileAttributes attrs) throws IOException {
		if (dir.equals(source)) {
	        return FileVisitResult.CONTINUE;
		}
		Path relative = source.relativize(dir);
        if (directoryIncludePatchMatcher.matches(relative) && (directoryExcludePatchMatcher == null || !directoryExcludePatchMatcher.matches(relative))) {
        	ZipEntry zipEntry = new ZipEntry(relative.toString().replace(System.getProperty("file.separator"), "/") + "/");
    		zipEntry.setTime(preserve ? Files.getLastModifiedTime(dir).toMillis() : 0);
        	zipOutputStream.putNextEntry(zipEntry);
        	zipOutputStream.closeEntry();
        }
        return FileVisitResult.CONTINUE;
	}
	
    @Override
    public FileVisitResult visitFile(Path file, BasicFileAttributes attrs) throws IOException {
    	Path relative = source.relativize(file);
        if (fileIncludePatchMatcher.matches(relative) && (fileExcludePatchMatcher == null || !fileExcludePatchMatcher.matches(relative))) {
        	ZipEntry zipEntry = new ZipEntry(relative.toString().replace(System.getProperty("file.separator"), "/"));
    		zipEntry.setTime(preserve ? Files.getLastModifiedTime(file).toMillis() : 0);
        	zipOutputStream.putNextEntry(zipEntry);
        	Files.copy(file, zipOutputStream);
        	zipOutputStream.closeEntry();
        }
        return FileVisitResult.CONTINUE;
    }
}
