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
 * @author Yassuo Toda
 */
public class JSDirectoryCopyTask extends JSTask {
	
	@JSParameter(type = File.class, name = "source", component = "Directory")
	@JSParameter(name = "include")
	@JSParameter(name = "exclude")
	@JSParameter(type = File.class, name = "destination", component = "Directory")
	@JSParameter(type = Boolean.class, name = "overwrite")
	@JSParameter(type = Boolean.class, name = "preserve")
	private Map<String, Object> parameterMap;

	@Override
	public void execute() throws Exception {
		
		File source = getFile("source");
		String include = nvl(getString("include"), "*");
		String exclude = getString("exclude");
		File destination = getFile("destination");
		boolean overwrite = nvl(getBoolean("overwrite"), false);
		boolean preserve = nvl(getBoolean("preserve"), false);
		
		JSDirectoryUtils.copy(source, include, exclude, destination, overwrite, preserve);
	}

	@Override
	public <T> T accept(JSTaskVisitor<T> visitor) {
		return visitor.visitDirectoryCopyTask(this);
	}
}
