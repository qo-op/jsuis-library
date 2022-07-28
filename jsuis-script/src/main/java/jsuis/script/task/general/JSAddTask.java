package jsuis.script.task.general;

import java.util.List;
import java.util.Map;

import jsuis.script.annotation.JSParameter;
import jsuis.script.task.JSTask;
import jsuis.script.visitor.JSTaskVisitor;

/**
 * Add task
 * 
 * list.add(value);
 * list.add(value, index);
 * 
 * @author Yassuo Toda
 */
public class JSAddTask extends JSTask {
	
	@JSParameter(name = "list")
	@JSParameter(name = "value")
	@JSParameter(name = "index")
	private Map<String, Object> parameterMap;
	
	@SuppressWarnings("unchecked")
	@Override
	public void execute() throws Exception {
		
		Object object = getObject("list");
		if (!(object instanceof List)) {
			throw new Exception(String.format("Object '%s' is not a List", object));
		}
		List<Object> list = (List<Object>) object;
		Object value = getObject("value");
		Integer index = getInteger("index");
		
		if (index == null) {
			list.add(value);
		} else {
			if (index < 0) {
				index = Math.max(index + list.size(), 0);
			}
			list.add(index, value);
		}
	}
	
	public <T> T accept(JSTaskVisitor<T> visitor) {
		return visitor.visitAddTask(this);
	}
}
