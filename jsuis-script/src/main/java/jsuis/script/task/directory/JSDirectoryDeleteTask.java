package jsuis.script.task.directory;

import java.io.File;
import java.util.Map;

import jsuis.file.JSDirectoryUtils;
import jsuis.script.annotation.JSParameter;
import jsuis.script.task.JSTask;
import jsuis.script.visitor.JSTaskVisitor;

/**
 * Directory delete task
 * 
 * Directory.delete(directory)
 * Directory.delete(directory, include)
 * Directory.delete(directory, include, exclude)
 * 
 * @author Yassuo Toda
 */
public class JSDirectoryDeleteTask extends JSTask {
	
	@JSParameter(type = File.class, name = "directory")
	@JSParameter(type = File.class, parent = "directory")
	@JSParameter(name = "include")
	@JSParameter(name = "exclude")
	private Map<String, Object> parameterMap;

	@Override
	public void execute() throws Exception {
		
		File directory = getFile("directory");
		String include = nvl(getString("include"), "*");
		String exclude = getString("exclude");
		
		JSDirectoryUtils.delete(directory, include, exclude);
	}

	@Override
	public <T> T accept(JSTaskVisitor<T> visitor) {
		return visitor.visitDirectoryDeleteTask(this);
	}
}
