package jsuis.script.task.general;

import java.util.List;
import java.util.Map;

import jsuis.script.annotation.JSParameter;
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
	
	@JSParameter(name = "name", value = "get")
	@JSParameter(name = "variable")
	@JSParameter(name = "object", value = "x")
	@JSParameter(name = "key", value = "0")
	private Map<String, Object> parameterMap;
	
	@Override
	public void execute() throws Exception {
		
		String variable = getString("variable");
		Object object = getObject("object");
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
		
		getBlock().set(variable, value);
	}

	@Override
	public <T> T accept(JSTaskVisitor<T> visitor) {
		return visitor.visitGetTask(this);
	}
}
