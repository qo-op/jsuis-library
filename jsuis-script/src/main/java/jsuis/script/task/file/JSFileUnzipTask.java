package jsuis.script.task.file;

import java.io.File;
import java.nio.file.Path;
import java.util.Map;

import org.apache.commons.io.FilenameUtils;

import jsuis.file.JSFileUtils;
import jsuis.script.annotation.JSParameter;
import jsuis.script.task.JSTask;
import jsuis.script.visitor.JSTaskVisitor;

/**
 * File unzip task
 * 
 * File.unzip(source)
 * File.unzip(source, overwrite)
 * File.unzip(source, overwrite, preserve)
 * 
 * File.unzip(source, destination)
 * File.unzip(source, destination, overwrite)
 * File.unzip(source, destination, overwrite, preserve)
 * 
 * @author Yassuo Toda
 */
public class JSFileUnzipTask extends JSTask {
	
	@JSParameter(name = "name", value = "File.unzip")
	@JSParameter(type = File.class, name = "source")
	@JSParameter(type = File.class, name = "destination")
	@JSParameter(type = Boolean.class, name = "overwrite", value = "false")
	@JSParameter(type = Boolean.class, name = "preserve", value = "false")
	private Map<String, Object> parameterMap;

	@Override
	public void execute() throws Exception {
		
		File source = getFile("source");
		File destination = getFile("destination");
		if (destination == null) {
			Path path = source.toPath();
			String fileName = path.getFileName().toString();
			destination = path.getParent().resolve(FilenameUtils.removeExtension(fileName)).toFile();
		}
		boolean overwrite = getBoolean("overwrite");
		boolean preserve = getBoolean("preserve");
		
		JSFileUtils.unzip(source, destination, overwrite, preserve);
	}

	@Override
	public <T> T accept(JSTaskVisitor<T> visitor) {
		return visitor.visitFileUnzipTask(this);
	}
}
