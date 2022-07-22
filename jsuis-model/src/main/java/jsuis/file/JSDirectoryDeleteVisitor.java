package jsuis.file;

import java.io.File;
import java.io.IOException;
import java.nio.file.AccessDeniedException;
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

/**
 * Directory delete visitor
 * 
 * @author Yassuo Toda
 */
public class JSDirectoryDeleteVisitor extends SimpleFileVisitor<Path> {

	public static void delete(File directory, String include, String exclude) throws IOException {
		if (Files.notExists(directory.toPath())) {
			throw new NoSuchFileException(directory.getAbsolutePath());
		} else if (!Files.exists(directory.toPath())) {
			throw new AccessDeniedException(directory.getAbsolutePath());
		} else if (!Files.isDirectory(directory.toPath())) {
			throw new NotDirectoryException(directory.getAbsolutePath());
		}
		new JSDirectoryDeleteVisitor(directory, include, exclude).delete();
	}
	
	private Path directory;
	private PathMatcher fileIncludePatchMatcher;
	private PathMatcher directoryIncludePatchMatcher;
	private PathMatcher fileExcludePatchMatcher;
	private PathMatcher directoryExcludePatchMatcher;
	
	private JSDirectoryDeleteVisitor(File directory, String include, String exclude) throws IOException {
		this.directory = directory.toPath();
		FileSystem fileSystem = FileSystems.getDefault();
		fileIncludePatchMatcher = fileSystem.getPathMatcher("glob:" + include);
		directoryIncludePatchMatcher = fileSystem.getPathMatcher("glob:" + include.replaceAll("/$", ""));
		if (exclude != null && !exclude.isEmpty()) {
			fileExcludePatchMatcher = fileSystem.getPathMatcher("glob:" + exclude);
			directoryExcludePatchMatcher = fileSystem.getPathMatcher("glob:" + exclude.replaceAll("/$", ""));
		}
	}
	
	public void delete() throws IOException {
		Files.walkFileTree(directory, this);
	}
	
    @Override
    public FileVisitResult visitFile(Path file, BasicFileAttributes attrs) throws IOException {
    	Path relative = directory.relativize(file);
        if (fileIncludePatchMatcher.matches(relative) && (fileExcludePatchMatcher == null || !fileExcludePatchMatcher.matches(relative))) {
        	Files.delete(file);
        }
        return FileVisitResult.CONTINUE;
    }
    
    @Override
    public FileVisitResult postVisitDirectory(Path dir, IOException exc) throws IOException {
		Path relative = directory.relativize(dir);
        if (directoryIncludePatchMatcher.matches(relative) && (directoryExcludePatchMatcher == null || !directoryExcludePatchMatcher.matches(relative))) {
        	Files.delete(dir);
        }
        return FileVisitResult.CONTINUE;
    }
}
