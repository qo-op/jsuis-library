package jsuis.properties;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Properties;

/**
 * Properties
 * 
 * @author Yassuo Toda
 */
public class JSProperties extends Properties {

	private static final long serialVersionUID = 1L;

	private File file;
	
	public JSProperties(File file) {
		this.file = file;
		if (file.exists()) {
			try (InputStream inputStream = new FileInputStream(file)) {
				load(inputStream);
			} catch (IOException e) {
				e.printStackTrace();
			}
		} else {
			File parentFile = file.getParentFile();
			if (parentFile != null) {
				parentFile.mkdirs();
				try {
					file.createNewFile();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
	}
	
	public File getFile() {
		return file;
	}
	
	public void store() {
		try (OutputStream outputStream = new FileOutputStream(getFile())) {
			store(outputStream, null);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
