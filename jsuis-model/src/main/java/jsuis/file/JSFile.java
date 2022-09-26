package jsuis.file;

import java.io.File;
import java.net.URI;
import java.nio.file.Path;
import java.nio.file.Paths;

public class JSFile extends File {

	private static final long serialVersionUID = 1L;

	public JSFile(File parent, String child) {
		this(new File(parent, child));
	}

	public JSFile(String pathname) {
		this(new File(pathname));
	}

	public JSFile(String parent, String child) {
		this(new File(parent, child));
	}

	public JSFile(URI uri) {
		this(new File(uri));
	}

	public JSFile(File file) {
		super(getPath(file));
	}
	
	public static String getPath(File file) {
		if (file == null) {
			return null;
		}
		if (!file.isAbsolute()) {
			Path path = file.toPath();
			if (path.startsWith(Paths.get("~"))) {
				int nameCount = path.getNameCount();
				if (nameCount > 1) {
					path = Paths.get(System.getProperty("user.home")).resolve(path.subpath(1, nameCount));
				} else {
					path = Paths.get(System.getProperty("user.home"));
				}
			}
			file = path.toFile();
		}
		return file.getPath();
	}
}
