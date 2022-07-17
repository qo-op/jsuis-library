package jsuis.script.task.file;

import java.io.File;
import java.util.Map;

import jsuis.file.JSFileUtils;
import jsuis.script.annotation.JSParameter;
import jsuis.script.task.JSTask;
import jsuis.script.visitor.JSTaskVisitor;

/**
 * File copy task
 * 
 * File.copy(source, destination)
 * File.copy(source, destination, filename)
 * File.copy(source, destination, filename, overwrite)
 * File.copy(source, destination, filename, overwrite, preserve)
 * 
 * @author Yassuo Toda
 */
public class JSFileCopyTask extends JSTask {
	
	@JSParameter(name = "name", value = "File.copy")
	@JSParameter(type = File.class, name = "source")
	@JSParameter(type = File.class, name = "destination")
	@JSParameter(type = File.class, parent = "destination")
	@JSParameter(name = "fileName") 
	@JSParameter(type = Boolean.class, name = "overwrite", value = "false")
	@JSParameter(type = Boolean.class, name = "preserve", value = "false")
	private Map<String, Object> parameterMap;

	@Override
	public void execute() throws Exception {
		
		File source = getFile("source");
		File destination = getFile("destination");
		String fileName = getString("fileName");
		boolean overwrite = getBoolean("overwrite");
		boolean preserve = getBoolean("preserve");
		
		JSFileUtils.copy(source, destination, fileName, overwrite, preserve);
	}

	@Override
	public <T> T accept(JSTaskVisitor<T> visitor) {
		return visitor.visitFileCopyTask(this);
	}
}
