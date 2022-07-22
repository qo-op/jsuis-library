package jsuis.script.task.general;

import java.util.List;
import java.util.Map;

import jsuis.script.annotation.JSParameter;
import jsuis.script.visitor.JSTaskVisitor;

/**
 * Add task
 * 
 * list.add((type) value);
 * list.add((type) value, index);
 * 
 * @author Yassuo Toda
 */
public class JSAddTask extends JSAbstractSetTask {
	
	@JSParameter(name = "name", value = "add")
	@JSParameter(name = "list", value = "list")
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
		Object value = getValue();
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
