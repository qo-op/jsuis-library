package jsuis.script.task.general;

import java.util.List;
import java.util.Map;

import jsuis.script.annotation.JSParameter;
import jsuis.script.task.JSTask;
import jsuis.script.visitor.JSTaskVisitor;

/**
 * Clear task
 * 
 * list.clear();
 * 
 * @author Yassuo Toda
 */
public class JSClearTask extends JSTask {
	
	@JSParameter(name = "name", value = "clear")
	@JSParameter(name = "object")
	private Map<String, Object> parameterMap;
	
	@Override
	public void execute() throws Exception {
		
		Object object = getObject("object");
		if (object instanceof List) {
			List<?> list = (List<?>) object;
			list.clear();
		} else if (object instanceof Map) {
			Map<?, ?> map = (Map<?, ?>) object;
			map.clear();
		} else {
			throw new Exception(String.format("Object '%s' is neither a List nor a Map", object));
		}
	}
	
	public <T> T accept(JSTaskVisitor<T> visitor) {
		return visitor.visitClearTask(this);
	}
}
