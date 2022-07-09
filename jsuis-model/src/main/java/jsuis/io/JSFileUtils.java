package jsuis.io;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URL;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOCase;
import org.apache.commons.io.IOUtils;
import org.apache.commons.io.filefilter.WildcardFileFilter;

/**
 * File utils
 * 
 * @author Yassuo Toda
 */
public class JSFileUtils extends FileUtils {

	public static File translate(File file) {
		if (file == null) {
			return null;
		}
		if (!file.isAbsolute()) {
			String path = file.getPath();
			if (path.startsWith("~")) {
				if (path.length() == 1) {
					file = new File(System.getProperty("user.home"));
				} else {
					String shortcut = "~" + File.separator;
					if (path.startsWith(shortcut)) {
						file = new File(System.getProperty("user.home"), path.substring(shortcut.length()));
					}
				}
			}
		}
		return file;
	}
	
    public static void copyURLToFile(URL url, File file) throws IOException {
		delete(file);
		File temp = temp(file);
		FileUtils.copyURLToFile(url, temp);
		temp.renameTo(file);
    }
    
    public static void zipDirectory(File directory, File zip) throws IOException {
    	if (directory.isDirectory()) {
    		zipFiles(directory.listFiles(), zip);
    	}
    }
    
    public static void zipDirectory(File directory, File zip, String[] extensions, boolean recursive) throws IOException {
    	if (directory.isDirectory()) {
			Collection<File> fileCollection = FileUtils.listFiles(directory, extensions, recursive);
    		zipFiles(fileCollection, zip);
    	}
    }
    
	public static void zipFiles(Iterable<File> fileIterable, File zip) throws IOException {
		delete(zip);
		File temp = temp(zip);
		try (ZipOutputStream zipOutputStream = zipOutputStream(temp)) {
			for (File file : fileIterable) {
				zip(file, zipOutputStream);
			}
		}
		temp.renameTo(zip);
	}
    
	public static void zipFiles(File[] files, File zip) throws IOException {
		delete(zip);
		File temp = temp(zip);
		try (ZipOutputStream zipOutputStream = zipOutputStream(temp)) {
			for (File file : files) {
				zip(file, zipOutputStream);
			}
		}
		temp.renameTo(zip);
	}
	
	public static void zipFile(File file, File zip) throws IOException {
		delete(zip);
		File temp = temp(zip);
		try (ZipOutputStream zipOutputStream = zipOutputStream(temp)) {
			zip(file, zipOutputStream);
		}
		temp.renameTo(zip);
	}
	
	private static void zip(File file, ZipOutputStream zipOutputStream) throws IOException {
		if (file.isFile()) {
			try (FileInputStream fileInputStream = new FileInputStream(file)) {
				ZipEntry zipEntry = new ZipEntry(file.getAbsolutePath().replaceAll("^.*\\\\\\.\\\\", "").replace("\\", "/"));
				zipEntry.setTime(0);
				zipOutputStream.putNextEntry(zipEntry);
				IOUtils.copy(fileInputStream, zipOutputStream);
			}
		}
    }
	
	private static ZipOutputStream zipOutputStream(File zip) throws FileNotFoundException {
		return new ZipOutputStream(new FileOutputStream(zip));
	}
	
	public static void delete(File file) throws IOException {
		if (file.exists()) {
			FileUtils.forceDelete(file);
		}
	}
    
	public static List<File> dir(String directory, String wildcard) {
		return dir(new File(directory), wildcard, false);
	}
	
	public static List<File> dir(String directory, String wildcard, boolean recursive) {
		return dir(new File(directory), wildcard, recursive);
	}
	
	public static List<File> dir(File directory, String wildcard) {
		return dir(directory, wildcard, false);
	}
	
	public static List<File> dir(File directory, String wildcard, boolean recursive) {
		List<File> fileList = new ArrayList<>();
		WildcardFileFilter wildcardFileFilter = new WildcardFileFilter(wildcard, IOCase.SYSTEM);
		dir(fileList, directory, wildcardFileFilter, recursive);
		return fileList;
	}
	
	private static void dir(List<File> fileList, File directory, WildcardFileFilter wildcardFileFilter, boolean recursive) {
		File[] files = directory.listFiles();
		for (File file : files) {
			if (wildcardFileFilter.accept(file)) {
				fileList.add(file);
			}
            if (recursive && file.isDirectory()) {
            	dir(fileList, file, wildcardFileFilter, recursive);
            }
		}
	}
	
    private static File temp(File file) throws IOException {
		File directory = file.getParentFile();
		directory.mkdirs();
		return File.createTempFile(file.getName(), null, directory);
    }
}
