package jsuis.script.task.file;

import java.io.File;
import java.util.Map;

import jsuis.file.JSFileUtils;
import jsuis.script.annotation.JSParameter;
import jsuis.script.task.JSTask;
import jsuis.script.visitor.JSTaskVisitor;

/**
 * File move task
 * 
 * File.move(source, destination)
 * File.move(source, destination, filename)
 * File.move(source, destination, filename, overwrite)
 * File.move(source, destination, filename, overwrite, preserve)
 * 
 * @author Yassuo Toda
 */
public class JSFileMoveTask extends JSTask {
	
	@JSParameter(type = File.class, name = "source")
	@JSParameter(type = File.class, name = "destination", component = "Directory")
	@JSParameter(name = "fileName") 
	@JSParameter(type = Boolean.class, name = "overwrite")
	@JSParameter(type = Boolean.class, name = "preserve")
	private Map<String, Object> parameterMap;

	@Override
	public void execute() throws Exception {
		
		File source = getFile("source");
		File destination = getFile("destination");
		String fileName = getString("fileName");
		Boolean overwrite = nvl(getBoolean("overwrite"), false);
		Boolean preserve = nvl(getBoolean("preserve"), false);
		
		JSFileUtils.move(source, destination, fileName, overwrite, preserve);
	}

	@Override
	public <T> T accept(JSTaskVisitor<T> visitor) {
		return visitor.visitFileMoveTask(this);
	}
}
