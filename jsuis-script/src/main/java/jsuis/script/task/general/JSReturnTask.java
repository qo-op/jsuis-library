package jsuis.script.task.general;

import java.util.Map;

import jsuis.lang.JSReturnException;
import jsuis.script.annotation.JSParameter;
import jsuis.script.task.JSTask;
import jsuis.script.visitor.JSTaskVisitor;

/**
 * Return task
 * 
 * return new type(value);
 * 
 * @author Yassuo Toda
 */
public class JSReturnTask extends JSTask {
	
	@JSParameter(name = "value")
	private Map<String, Object> parameterMap;

	@Override
	public void execute() throws Exception {
		
		Object value = getObject("value");
		
		throw new JSReturnException(value);
	}
	
	public <T> T accept(JSTaskVisitor<T> visitor) {
		return visitor.visitReturnTask(this);
	}
}
