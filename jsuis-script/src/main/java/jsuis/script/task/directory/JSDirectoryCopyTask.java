package jsuis.script.task.directory;

import java.io.File;
import java.util.Map;

import jsuis.file.JSDirectoryUtils;
import jsuis.script.annotation.JSParameter;
import jsuis.script.task.JSTask;
import jsuis.script.visitor.JSTaskVisitor;

/**
 * Directory copy task
 * 
 * Directory.copy(source, destination)
 * Directory.copy(source, destination, overwrite)
 * Directory.copy(source, destination, overwrite, preserve)
 * 
 * Directory.copy(source, include, destination)
 * Directory.copy(source, include, destination, overwrite)
 * Directory.copy(source, include, destination, overwrite, preserve)
 * 
 * Directory.copy(source, include, exclude, destination)
 * Directory.copy(source, include, exclude, destination, overwrite)
 * Directory.copy(source, include, exclude, destination, overwrite, preserve)
 * 
 * @author Yassuo Toda
 */
public class JSDirectoryCopyTask extends JSTask {
	
	@JSParameter(name = "name", value = "Directory.copy")
	@JSParameter(type = File.class, name = "source")
	@JSParameter(type = File.class, parent = "source")
	@JSParameter(name = "include", value = "**/./*")
	@JSParameter(name = "exclude")
	@JSParameter(type = File.class, name = "destination")
	@JSParameter(type = File.class, parent = "destination")
	@JSParameter(type = Boolean.class, name = "overwrite", value = "false")
	@JSParameter(type = Boolean.class, name = "preserve", value = "false")
	private Map<String, Object> parameterMap;

	@Override
	public void execute() throws Exception {
		
		File source = getFile("source");
		String include = getString("include");
		String exclude = getString("exclude");
		File destination = getFile("destination");
		boolean overwrite = getBoolean("overwrite");
		boolean preserve = getBoolean("preserve");
		
		JSDirectoryUtils.copy(source, include, exclude, destination, overwrite, preserve);
	}

	@Override
	public <T> T accept(JSTaskVisitor<T> visitor) {
		return visitor.visitDirectoryCopyTask(this);
	}
}
