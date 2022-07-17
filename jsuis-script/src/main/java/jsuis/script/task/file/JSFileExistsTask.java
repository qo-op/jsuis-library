package jsuis.script.task.file;

import java.io.File;
import java.nio.file.Files;
import java.util.Map;

import jsuis.script.annotation.JSParameter;
import jsuis.script.task.JSTask;
import jsuis.script.visitor.JSTaskVisitor;

/**
 * File exists task
 * 
 * var variable = File.exists(file)
 * 
 * @author Yassuo Toda
 */
public class JSFileExistsTask extends JSTask {
	
	@JSParameter(name = "name", value = "File.exists")
	@JSParameter(name = "variable", value = "exists")
	@JSParameter(type = File.class, name = "file")
	private Map<String, Object> parameterMap;

	@Override
	public void execute() throws Exception {
		
		String variable = getString("variable");
		File file = getFile("file");

		boolean exists = Files.exists(file.toPath());

		getBlock().var(variable, new Boolean(exists));
	}

	@Override
	public <T> T accept(JSTaskVisitor<T> visitor) {
		return visitor.visitFileExistsTask(this);
	}
}
