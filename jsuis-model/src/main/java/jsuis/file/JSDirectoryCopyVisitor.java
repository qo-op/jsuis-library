package jsuis.file;

import java.io.File;
import java.io.IOException;
import java.nio.file.AccessDeniedException;
import java.nio.file.CopyOption;
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
import java.nio.file.StandardCopyOption;
import java.nio.file.attribute.BasicFileAttributes;
import java.util.ArrayList;
import java.util.List;

/**
 * Directory copy visitor
 * 
 * @author Yassuo Toda
 */
public class JSDirectoryCopyVisitor extends SimpleFileVisitor<Path> {

	public static void copy(File source, String include, String exclude, File destination, boolean overwrite, boolean preserve) throws IOException {
		if (Files.notExists(source.toPath())) {
			throw new NoSuchFileException(source.getAbsolutePath());
		} else if (!Files.exists(source.toPath())) {
			throw new AccessDeniedException(source.getAbsolutePath());
		} else if (!Files.isDirectory(source.toPath())) {
			throw new NotDirectoryException(source.getAbsolutePath());
		}
		if (Files.exists(destination.toPath())) {
			if (!Files.isDirectory(destination.toPath())) {
				throw new NotDirectoryException(destination.getAbsolutePath());
			} else if (!overwrite) {
				throw new FileAlreadyExistsException(destination.getAbsolutePath());
			}
		}
		new JSDirectoryCopyVisitor(source, include, exclude, destination, overwrite, preserve).copy();
	}
	
	private Path source;
	private PathMatcher fileIncludePatchMatcher;
	private PathMatcher directoryIncludePatchMatcher;
	private PathMatcher fileExcludePatchMatcher;
	private PathMatcher directoryExcludePatchMatcher;
	private Path destination;
	private boolean preserve;
	private CopyOption[] copyOptions;
	
	private JSDirectoryCopyVisitor(File source, String include, String exclude, File destination, boolean overwrite, boolean preserve) throws IOException {
		this.source = source.toPath();
		FileSystem fileSystem = FileSystems.getDefault();
		fileIncludePatchMatcher = fileSystem.getPathMatcher("glob:" + include);
		directoryIncludePatchMatcher = fileSystem.getPathMatcher("glob:" + include.replaceAll("/$", ""));
		if (exclude != null && !exclude.isEmpty()) {
			fileExcludePatchMatcher = fileSystem.getPathMatcher("glob:" + exclude);
			directoryExcludePatchMatcher = fileSystem.getPathMatcher("glob:" + exclude.replaceAll("/$", ""));
		}
		this.destination = destination.toPath();
		this.preserve = preserve;
		List<CopyOption> copyOptionList = new ArrayList<>();
		if (overwrite) {
			copyOptionList.add(StandardCopyOption.REPLACE_EXISTING);
		}
		if (preserve) {
			copyOptionList.add(StandardCopyOption.COPY_ATTRIBUTES);
		}
		if (Files.notExists(this.destination)) {
			Files.createDirectories(this.destination);
		}
		copyOptions = copyOptionList.toArray(new CopyOption[0]);
	}
	
	public void copy() throws IOException {
		Files.walkFileTree(source, this);
	}
	
	@Override
	public FileVisitResult preVisitDirectory(Path dir, BasicFileAttributes attrs) throws IOException {
		Path relative = source.relativize(dir);
        if (directoryIncludePatchMatcher.matches(relative) && (directoryExcludePatchMatcher == null || !directoryExcludePatchMatcher.matches(relative))) {
        	Files.copy(dir, destination.resolve(relative), copyOptions);
        }
        return FileVisitResult.CONTINUE;
	}
	
    @Override
    public FileVisitResult visitFile(Path file, BasicFileAttributes attrs) throws IOException {
    	Path relative = source.relativize(file);
        if (fileIncludePatchMatcher.matches(relative) && (fileExcludePatchMatcher == null || !fileExcludePatchMatcher.matches(relative))) {
        	Files.copy(file, destination.resolve(relative), copyOptions);
        }
        return FileVisitResult.CONTINUE;
    }
    
    @Override
    public FileVisitResult postVisitDirectory(Path dir, IOException exc) throws IOException {
    	if (preserve) {
    		Path relative = source.relativize(dir);
            if (directoryIncludePatchMatcher.matches(relative) && (directoryExcludePatchMatcher == null || !directoryExcludePatchMatcher.matches(relative))) {
            	Files.setLastModifiedTime(destination.resolve(source.relativize(dir)), Files.getLastModifiedTime(dir));
            }
    	}
        return FileVisitResult.CONTINUE;
    }
}
