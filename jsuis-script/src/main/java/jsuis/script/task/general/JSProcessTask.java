package jsuis.script.task.general;

import java.io.File;
import java.util.List;
import java.util.Map;

import jsuis.script.annotation.JSParameter;
import jsuis.script.executor.JSProcess;
import jsuis.script.task.JSTask;
import jsuis.script.visitor.JSTaskVisitor;

/**
 * Process task
 * 
 * @author Yassuo Toda
 */
public class JSProcessTask extends JSTask {
	
	@JSParameter(name = "variable")
	@JSParameter(required = true, type = String.class, name = "command", component = "Text")
	@JSParameter(type = File.class, name = "directory", component = "Directory")
	@JSParameter(name = "charset")
	@JSParameter(type = Map.class, name = "environment")
	private Map<String, Object> parameterMap;
	
	@Override
	public void execute() throws Exception {
		
		String variable = getString("variable");
		List<String> command = getList("command", String.class);
		File directory = nvl(getFile("directory"), new File(".\\"));
		String charset = getString("charset");
		Map<String, String> environment = getMap("enviroment", String.class);
		
		String result = new JSProcess()
				.command(command)
				.directory(directory)
				.charset(charset)
				.environment(environment)
				.execute();
		
		if (variable != null && !variable.trim().isEmpty()) {
			getBlock().set(variable, result);
		}
	}

	@Override
	public <T> T accept(JSTaskVisitor<T> visitor) {
		return visitor.visitProcessTask(this);
	}
}
