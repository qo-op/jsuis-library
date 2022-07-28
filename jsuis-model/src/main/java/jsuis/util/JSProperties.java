package jsuis.util;

import java.io.IOException;
import java.io.Reader;
import java.io.Writer;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Properties;

/**
 * Properties
 * 
 * @author Yassuo Toda
 */
public class JSProperties extends Properties {

	private static final long serialVersionUID = 1L;

	private Path path;
	
	public JSProperties(Path path) throws IOException {
		this.path = path;
		load();
	}
	
	public JSProperties set(String key, String value) {
		setProperty(key, value);
		return this;
	}
	
	public void load() throws IOException {
		if (Files.exists(path)) {
			try (Reader reader = Files.newBufferedReader(path, StandardCharsets.ISO_8859_1)) {
				load(reader);
			}
		}
	}
	
	public void store() throws IOException {
		try (Writer writer = Files.newBufferedWriter(path, StandardCharsets.ISO_8859_1)) {
			store(writer, null);
		}
	}
}
