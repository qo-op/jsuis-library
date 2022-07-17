package jsuis.file;

import java.io.File;
import java.io.IOException;
import java.nio.file.FileSystem;
import java.nio.file.FileSystems;
import java.nio.file.FileVisitResult;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.PathMatcher;
import java.nio.file.SimpleFileVisitor;
import java.nio.file.attribute.BasicFileAttributes;
import java.util.ArrayList;
import java.util.List;

/**
 * Directory list visitor
 * 
 * @author Yassuo Toda
 */
public class JSDirectoryListVisitor extends SimpleFileVisitor<Path> {

	public static List<File> list(File directory, String include, String exclude) throws IOException {
		return new JSDirectoryListVisitor(new ArrayList<>(), directory, include, exclude).list();
	}
	
	private List<File> list;
	private Path directory;
	private PathMatcher fileIncludePatchMatcher;
	private PathMatcher directoryIncludePatchMatcher;
	private PathMatcher fileExcludePatchMatcher;
	private PathMatcher directoryExcludePatchMatcher;
	
	private JSDirectoryListVisitor(List<File> list, File directory, String include, String exclude) {
		this.list = list;
		this.directory = directory.toPath();
		FileSystem fileSystem = FileSystems.getDefault();
		fileIncludePatchMatcher = fileSystem.getPathMatcher("glob:" + include);
		directoryIncludePatchMatcher = fileSystem.getPathMatcher("glob:" + include.replaceAll("/$", ""));
		if (exclude != null && !exclude.isEmpty()) {
			fileExcludePatchMatcher = fileSystem.getPathMatcher("glob:" + exclude);
			directoryExcludePatchMatcher = fileSystem.getPathMatcher("glob:" + exclude.replaceAll("/$", ""));
		}
	}
	
	public List<File> list() throws IOException {
		Files.walkFileTree(directory, this);
		if (list.get(0).equals(directory.toFile())) {
			list.remove(0);
		}
		return list;
	}
	
	@Override
	public FileVisitResult preVisitDirectory(Path dir, BasicFileAttributes attrs) throws IOException {
		if (dir.equals(directory)) {
	        return FileVisitResult.CONTINUE;
		}
		Path relative = directory.relativize(dir);
        if (directoryIncludePatchMatcher.matches(relative) && (directoryExcludePatchMatcher == null || !directoryExcludePatchMatcher.matches(relative))) {
        	list.add(dir.toFile());
        }
        return FileVisitResult.CONTINUE;
	}
	
    @Override
    public FileVisitResult visitFile(Path file, BasicFileAttributes attrs) throws IOException {
    	Path relative = directory.relativize(file);
        if (fileIncludePatchMatcher.matches(relative) && (fileExcludePatchMatcher == null || !fileExcludePatchMatcher.matches(relative))) {
        	list.add(file.toFile());
        }
        return FileVisitResult.CONTINUE;
    }
}
