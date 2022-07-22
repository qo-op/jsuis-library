package jsuis.script.task.directory;

import java.io.File;
import java.util.List;
import java.util.Map;

import jsuis.file.JSDirectoryUtils;
import jsuis.script.annotation.JSParameter;
import jsuis.script.task.JSTask;
import jsuis.script.visitor.JSTaskVisitor;

/**
 * Directory list task
 * 
 * variable = Directory.list(directory);
 * variable = Directory.list(directory, include);
 * variable = Directory.list(directory, include, exclude);
 * 
 * @author Yassuo Toda
 */
public class JSDirectoryListTask extends JSTask {
	
	@JSParameter(name = "name", value = "Directory.list")
	@JSParameter(name = "variable")
	@JSParameter(type = File.class, name = "directory", value = ".\\")
	@JSParameter(type = File.class, parent = "directory")
	@JSParameter(name = "include", value = "*")
	@JSParameter(name = "exclude")
	private Map<String, Object> parameterMap;

	@Override
	public void execute() throws Exception {
		
		String variable = getString("variable");
		File directory = getFile("directory");
		String include = getString("include");
		String exclude = getString("exclude");
		
		List<File> fileList = JSDirectoryUtils.list(directory, include, exclude);
		
		getBlock().set(variable, fileList);
	}

	@Override
	public <T> T accept(JSTaskVisitor<T> visitor) {
		return visitor.visitDirectoryListTask(this);
	}
}
