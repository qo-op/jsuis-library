package jsuis.script.task.general;

import java.io.File;
import java.util.Map;

import jsuis.script.annotation.JSParameter;
import jsuis.script.block.JSWorkBlock;

/**
 * Work task
 * 
 * @author Yassuo Toda
 */
public class JSWorkTask extends JSCallTask {

	public JSWorkTask() {
	}
	
	public JSWorkTask(Map<String, Object> valueMap) {
		super(valueMap);
	}
	
	@JSParameter(name = "name", value = "work")
	@JSParameter(name = "variable")
	@JSParameter(type = File.class, name = "file")
	@JSParameter(type = Map.class, name = "values")
	private Map<String, Object> valueMap;
	
	@Override
	public void execute() throws Exception {
		
		String variable = getString("variable");
		File file = getFile("file");
		Map<String, Object> valueMap = getMap("values");
		
		JSWorkBlock workBlock = getWorkBlock(file);
		if (workBlock == null) {
			throw new Exception(String.format("Work '%' not found.", file));
		}
		
		Object result = workBlock.execute(valueMap);
		
		if (!variable.isEmpty()) {
			getBlock().set(variable, result);
		}
	}

	public JSWorkBlock getWorkBlock(File file) {
		// TODO
		return null;
	}
}
