package jsuis.file;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.AccessDeniedException;
import java.nio.file.FileAlreadyExistsException;
import java.nio.file.Files;
import java.nio.file.NoSuchFileException;
import java.nio.file.NotDirectoryException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

/**
 * Directory utils
 * 
 * @author Yassuo Toda
 */
public class JSDirectoryUtils {

	public static void copy(File source, String include, String exclude, File destination, boolean overwrite, boolean preserve) throws IOException {
		JSDirectoryCopyVisitor.copy(source, include, exclude, destination, overwrite, preserve);
	}

	public static void delete(File directory, String include, String exclude) throws IOException {
		JSDirectoryDeleteVisitor.delete(directory, include, exclude);
	}

	public static List<File> list(File directory, String include) throws IOException {
		return list(directory, include, null);
	}
	
	public static List<File> list(File directory, String include, String exclude) throws IOException {
		return JSDirectoryListVisitor.list(directory, include, exclude);
	}
	
	public static void zip(File source, String include, String exclude, File destination, boolean overwrite, boolean preserve) throws IOException {
		JSDirectoryZipVisitor.zip(source, include, exclude, destination, overwrite, preserve);
	}
	
	public static void zip(File source, List<String> nameList, File destination, boolean overwrite, boolean preserve) throws IOException {
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
		Path directory = source.toPath();
		try (ZipOutputStream zipOutputStream = new ZipOutputStream(Files.newOutputStream(destination.toPath()))) {
			for (String name : nameList) {
				Path path = directory.resolve(Paths.get(name));
				Path relative = directory.relativize(path);
				if (Files.isDirectory(path)) {
		        	ZipEntry zipEntry = new ZipEntry(relative.toString().replace(System.getProperty("file.separator"), "/") + "/");
		    		zipEntry.setTime(preserve ? Files.getLastModifiedTime(path).toMillis() : 0);
		        	zipOutputStream.putNextEntry(zipEntry);
		        	zipOutputStream.closeEntry();
				} else {
		        	ZipEntry zipEntry = new ZipEntry(relative.toString().replace(System.getProperty("file.separator"), "/"));
		    		zipEntry.setTime(preserve ? Files.getLastModifiedTime(path).toMillis() : 0);
		        	zipOutputStream.putNextEntry(zipEntry);
		        	Files.copy(path, zipOutputStream);
		        	zipOutputStream.closeEntry();
				}
			}
		}
	}
}
