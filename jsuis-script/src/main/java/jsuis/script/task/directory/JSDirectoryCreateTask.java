package jsuis.script.task.directory;

import java.io.File;
import java.nio.file.Files;
import java.util.Map;

import jsuis.script.annotation.JSParameter;
import jsuis.script.task.JSTask;
import jsuis.script.visitor.JSTaskVisitor;

/**
 * Directory create task
 * 
 * Directory.create(directory)
 * 
 * @author Yassuo Toda
 */
public class JSDirectoryCreateTask extends JSTask {
	
	@JSParameter(type = File.class, name = "directory")
	@JSParameter(type = File.class, parent = "directory")
	private Map<String, Object> parameterMap;

	@Override
	public void execute() throws Exception {
		
		File directory = getFile("directory");
		
		Files.createDirectories(directory.toPath());
	}

	@Override
	public <T> T accept(JSTaskVisitor<T> visitor) {
		return visitor.visitDirectoryCreateTask(this);
	}
}
