package jsuis.script.task.general;

import java.io.File;
import java.util.Map;

import jsuis.script.annotation.JSParameter;
import jsuis.script.block.JSWorkBlock;
import jsuis.script.task.JSTask;
import jsuis.script.visitor.JSTaskVisitor;

/**
 * Work task
 * 
 * variable = work(file);
 * variable = work(file, arguments);
 * 
 * work(file);
 * work(file, { argument : value, argument : value, .... });
 * 
 * @author Yassuo Toda
 */
public class JSWorkTask extends JSTask {
	
	@JSParameter(name = "variable")
	@JSParameter(type = File.class, name = "file")
	@JSParameter(type = Map.class, name = "arguments")
	private Map<String, Object> parameterMap;
	
	@Override
	public void execute() throws Exception {
		
		String variable = getString("variable");
		File file = getFile("file");
		Map<String, Object> argumentMap = getMap("arguments");
		
		JSWorkBlock workBlock = getWorkBlock(file);
		if (workBlock == null) {
			throw new Exception(String.format("Work '%' not found.", file));
		}
		
		Object result = workBlock.execute(argumentMap);
		
		if (variable != null && !variable.isEmpty()) {
			getBlock().set(variable, result);
		}
	}

	public JSWorkBlock getWorkBlock(File file) {
		// TODO
		return null;
	}

	@Override
	public <T> T accept(JSTaskVisitor<T> visitor) {
		return visitor.visitWorkTask(this);
	}
}
