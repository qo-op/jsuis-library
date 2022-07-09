package jsuis.script.task.general;

import java.util.Map;

import jsuis.lang.JSReturnException;
import jsuis.script.annotation.JSParameter;
import jsuis.script.visitor.JSTaskVisitor;

/**
 * Return task
 * 
 * return (type) value;
 * 
 * @author Yassuo Toda
 */
public class JSReturnTask extends JSAbstractSetTask {

	public JSReturnTask() {
	}
	
	public JSReturnTask(Map<String, Object> valueMap) {
		super(valueMap);
	}
	
	@JSParameter(name = "name", value = "return")
	private Map<String, Object> valueMap;

	@Override
	public void execute() throws Exception {
		
		Object value = getValue();
		
		throw new JSReturnException(value);
	}
	
	public <T> T accept(JSTaskVisitor<T> visitor) {
		return visitor.visitReturnTask(this);
	}
}
