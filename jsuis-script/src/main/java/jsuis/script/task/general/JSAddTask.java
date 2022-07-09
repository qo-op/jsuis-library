package jsuis.script.task.general;

import java.util.List;
import java.util.Map;

import jsuis.script.annotation.JSParameter;
import jsuis.script.visitor.JSTaskVisitor;

/**
 * Add task
 * 
 * list.add((type) value);
 * 
 * @author Yassuo Toda
 */
public class JSAddTask extends JSAbstractSetTask {

	public JSAddTask() {
	}
	
	public JSAddTask(Map<String, Object> valueMap) {
		super(valueMap);
	}
	
	@JSParameter(name = "name", value = "add")
	@JSParameter(name = "list", value = "list")
	private Map<String, Object> valueMap;
	
	@Override
	public void execute() throws Exception {
		
		List<Object> list = getList("list");
		if (list == null) {
			throw new NullPointerException("" + getBlock().getBindings());
		}
		if (!(list instanceof List)) {
			throw new Exception(String.format("Object '%s' is not a List", list));
		}
		Object value = getValue();
		
		list.add(value);
	}
	
	public <T> T accept(JSTaskVisitor<T> visitor) {
		return visitor.visitAddTask(this);
	}
}
