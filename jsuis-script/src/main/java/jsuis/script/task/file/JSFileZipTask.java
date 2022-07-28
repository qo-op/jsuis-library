package jsuis.script.task.file;

import java.io.File;
import java.nio.file.Paths;
import java.util.Map;

import org.apache.commons.io.FilenameUtils;

import jsuis.file.JSFileUtils;
import jsuis.script.annotation.JSParameter;
import jsuis.script.task.JSTask;
import jsuis.script.visitor.JSTaskVisitor;

/**
 * File zip task
 * 
 * File.zip(source)
 * File.zip(source, overwrite)
 * File.zip(source, overwrite, preserve)
 * 
 * File.zip(source, destination)
 * File.zip(source, destination, overwrite)
 * File.zip(source, destination, overwrite, preserve)
 * 
 * @author Yassuo Toda
 */
public class JSFileZipTask extends JSTask {
	
	@JSParameter(type = File.class, name = "source")
	@JSParameter(type = File.class, name = "destination")
	@JSParameter(type = Boolean.class, name = "overwrite")
	@JSParameter(type = Boolean.class, name = "preserve")
	private Map<String, Object> parameterMap;

	@Override
	public void execute() throws Exception {
		
		File source = getFile("source");
		File destination = getFile("destination");
		if (destination == null) {
			String fileName = source.toPath().normalize().getFileName().toString();
			if (!fileName.isEmpty()) {
				destination = source.toPath().getParent().resolve(Paths.get(FilenameUtils.removeExtension(fileName) + ".zip")).toFile();
			}
		}
		Boolean overwrite = nvl(getBoolean("overwrite"), false);
		Boolean preserve = nvl(getBoolean("preserve"), true);
		
		JSFileUtils.zip(source, destination, overwrite, preserve);
	}

	@Override
	public <T> T accept(JSTaskVisitor<T> visitor) {
		return visitor.visitFileZipTask(this);
	}
}
