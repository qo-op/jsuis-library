package jsuis.file;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.AccessDeniedException;
import java.nio.file.CopyOption;
import java.nio.file.FileAlreadyExistsException;
import java.nio.file.Files;
import java.nio.file.NoSuchFileException;
import java.nio.file.NotDirectoryException;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.nio.file.attribute.FileTime;
import java.util.ArrayList;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;
import java.util.zip.ZipOutputStream;

import org.apache.commons.io.FileUtils;

/**
 * File utils
 * 
 * @author Yassuo Toda
 */
public class JSFileUtils extends FileUtils {
	
	public static void copy(File source, File destination, String fileName, boolean overwrite, boolean preserve) throws IOException {
		if (Files.notExists(source.toPath())) {
			throw new NoSuchFileException(source.getAbsolutePath());
		} else if (!Files.exists(source.toPath())) {
			throw new AccessDeniedException(source.getAbsolutePath());
		} else if (Files.isDirectory(source.toPath())) {
			throw new FileNotFoundException(source.getAbsolutePath());
		}
		if (Files.exists(destination.toPath())) {
			if (!Files.isDirectory(destination.toPath())) {
				throw new NotDirectoryException(destination.getAbsolutePath());
			}
		} else {
			Files.createDirectories(destination.toPath());
		}
		if (fileName == null || fileName.trim().isEmpty()) {
			fileName = source.getName();
		}
		List<CopyOption> copyOptionList = new ArrayList<>();
		if (overwrite) {
			copyOptionList.add(StandardCopyOption.REPLACE_EXISTING);
		}
		if (preserve) {
			copyOptionList.add(StandardCopyOption.COPY_ATTRIBUTES);
		}
		Files.copy(source.toPath(), destination.toPath().resolve(fileName), copyOptionList.toArray(new CopyOption[0]));
	}

	public static void move(File source, File destination, String fileName, boolean overwrite, boolean preserve) throws IOException {
		if (Files.notExists(source.toPath())) {
			throw new NoSuchFileException(source.getAbsolutePath());
		} else if (!Files.exists(source.toPath())) {
			throw new AccessDeniedException(source.getAbsolutePath());
		} else if (Files.isDirectory(source.toPath())) {
			throw new FileNotFoundException(source.getAbsolutePath());
		}
		if (Files.exists(destination.toPath())) {
			if (!Files.isDirectory(destination.toPath())) {
				throw new NotDirectoryException(destination.getAbsolutePath());
			}
		} else {
			Files.createDirectories(destination.toPath());
		}
		if (fileName == null || fileName.trim().isEmpty()) {
			fileName = source.getName();
		}
		List<CopyOption> copyOptionList = new ArrayList<>();
		if (overwrite) {
			copyOptionList.add(StandardCopyOption.REPLACE_EXISTING);
		}
		if (preserve) {
			copyOptionList.add(StandardCopyOption.COPY_ATTRIBUTES);
		}
		Files.move(source.toPath(), destination.toPath().resolve(fileName), copyOptionList.toArray(new CopyOption[0]));
	}

	public static void unzip(File source, File destination, boolean overwrite, boolean preserve) throws IOException {
		if (Files.notExists(source.toPath())) {
			throw new NoSuchFileException(source.getAbsolutePath());
		} else if (!Files.exists(source.toPath())) {
			throw new AccessDeniedException(source.getAbsolutePath());
		} else if (Files.isDirectory(source.toPath())) {
			throw new FileNotFoundException(source.getAbsolutePath());
		}
		if (Files.exists(destination.toPath())) {
			if (!Files.isDirectory(destination.toPath())) {
				throw new NotDirectoryException(destination.getAbsolutePath());
			} else if (!overwrite) {
				throw new FileAlreadyExistsException(destination.getAbsolutePath());
			}
		} else {
			Files.createDirectories(destination.toPath());
		}
		Path directory = destination.toPath();
		if (preserve) {
			try (ZipInputStream zipInputStream = new ZipInputStream(Files.newInputStream(source.toPath()))) {
				ZipEntry zipEntry = null;
				while ((zipEntry = zipInputStream.getNextEntry()) != null) {
					String name = zipEntry.getName();
					Path file = directory.resolve(name);
					if (name.endsWith("/")) {
						Files.createDirectories(file);
					} else {
						Files.createDirectories(file.getParent());
						Files.copy(zipInputStream, file);
						Files.setLastModifiedTime(file, FileTime.fromMillis(zipEntry.getTime()));
					}
				}
			}
			try (ZipInputStream zipInputStream = new ZipInputStream(Files.newInputStream(source.toPath()))) {
				ZipEntry zipEntry = null;
				while ((zipEntry = zipInputStream.getNextEntry()) != null) {
					String name = zipEntry.getName();
					if (name.endsWith("/")) {
						Path file = directory.resolve(name);
						Files.setLastModifiedTime(file, FileTime.fromMillis(zipEntry.getTime()));
					}
				}
			}
		} else {
			try (ZipInputStream zipInputStream = new ZipInputStream(Files.newInputStream(source.toPath()))) {
				ZipEntry zipEntry = null;
				while ((zipEntry = zipInputStream.getNextEntry()) != null) {
					String name = zipEntry.getName();
					Path file = directory.resolve(name);
					if (name.endsWith("/")) {
						Files.createDirectories(file);
					} else {
						Files.createDirectories(file.getParent());
						Files.copy(zipInputStream, file);
					}
				}
			}
		}
	}
	
	public static void zip(File source, File destination, boolean overwrite, boolean preserve) throws IOException {
		if (Files.notExists(source.toPath())) {
			throw new NoSuchFileException(source.getAbsolutePath());
		} else if (!Files.exists(source.toPath())) {
			throw new AccessDeniedException(source.getAbsolutePath());
		} else if (Files.isDirectory(source.toPath())) {
			throw new FileNotFoundException(source.getAbsolutePath());
		}
		if (Files.exists(destination.toPath())) {
			if (Files.isDirectory(destination.toPath())) {
				throw new FileNotFoundException(destination.getAbsolutePath());
			} else if (!overwrite) {
				throw new FileAlreadyExistsException(destination.getAbsolutePath());
			}
		}
		Files.createDirectories(destination.getParentFile().toPath());
		try (ZipOutputStream zipOutputStream = new ZipOutputStream(Files.newOutputStream(destination.toPath()))) {
			Path file = source.toPath();
	    	ZipEntry zipEntry = new ZipEntry(file.getFileName().toString());
			zipEntry.setTime(preserve ? Files.getLastModifiedTime(file).toMillis() : 0);
	    	zipOutputStream.putNextEntry(zipEntry);
	    	Files.copy(file, zipOutputStream);
	    	zipOutputStream.closeEntry();
		}
	}
}
