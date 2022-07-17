package jsuis.script.task.general;

import java.util.List;
import java.util.Map;

import jsuis.script.annotation.JSParameter;
import jsuis.script.task.JSTask;
import jsuis.script.visitor.JSTaskVisitor;

/**
 * Remove task
 * 
 * var variable = object.remove(key);
 * 
 * object.remove(element);
 * 
 * @author Yassuo Toda
 */
public class JSRemoveTask extends JSTask {
	
	@JSParameter(name = "name", value = "remove")
	@JSParameter(name = "variable", value = "element")
	@JSParameter(name = "object", value = "object")
	@JSParameter(name = "key")
	@JSParameter(name = "element")
	private Map<String, Object> parameterMap;
	
	@Override
	public void execute() throws Exception {
		
		String variable = getString("variable");
		Object object = getObject("object");
		if (object instanceof List) {
			List<?> list = (List<?>) object;
			Integer key = getInteger("key");
			if (key != null) {
				Object element = list.remove(key);
				if (variable != null && !variable.isEmpty()) {
					getBlock().var(variable, element);
				}
			} else {
				Object element = getObject("element");
				list.remove(element);
			}
		} else if (object instanceof Map) {
			Map<?, ?> map = (Map<?, ?>) object;
			String key = getString("key");
			map.remove(key);
		} else {
			throw new Exception(String.format("Object '%s' is neither a List nor a Map", object));
		}
	}
	
	public <T> T accept(JSTaskVisitor<T> visitor) {
		return visitor.visitRemoveTask(this);
	}
}
