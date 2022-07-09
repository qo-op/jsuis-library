package jsuis.script.task.general;

import java.util.List;
import java.util.Map;

import jsuis.script.annotation.JSParameter;
import jsuis.script.block.JSBlock;
import jsuis.script.task.JSTask;
import jsuis.script.visitor.JSTaskVisitor;

/**
 * Get task
 * 
 * variable = object.get(key);
 * 
 * @author Yassuo Toda
 */
public class JSGetTask extends JSTask {

	public JSGetTask() {
	}
	
	public JSGetTask(Map<String, Object> valueMap) {
		super(valueMap);
	}
	
	@JSParameter(name = "name", value = "get")
	@JSParameter(name = "variable", value = "value")
	@JSParameter(name = "object", value = "x")
	@JSParameter(name = "key", value = "0")
	private Map<String, Object> valueMap;
	
	@Override
	public void execute() throws Exception {
		
		String variable = getString("variable");
		Object object = getObject("object");
		if (object == null) {
			throw new NullPointerException("" + getBlock().getBindings());
		}
		Object value = null;
		if (object instanceof List) {
			List<?> list = (List<?>) object;
			int key = getInteger("key");
			value = list.get(key);
		} else if (object instanceof Map) {
			Map<?, ?> map = (Map<?, ?>) object;
			String key = getString("key");
			value = map.get(key);
		} else if (object instanceof String) {
			String string = (String) object;
			int key = getInteger("key");
			value = string.charAt(key);
		} else {
			throw new Exception(String.format("Object '%s' is neither a List, nor a Map, nor a String.", object));
		}
		
		JSBlock block = getBlock();
		block.put(variable, value);
	}

	@Override
	public <T> T accept(JSTaskVisitor<T> visitor) {
		return visitor.visitGetTask(this);
	}
}
