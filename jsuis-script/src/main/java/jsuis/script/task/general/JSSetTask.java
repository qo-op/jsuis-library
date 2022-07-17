package jsuis.script.task.general;

import java.util.Map;

import jsuis.script.annotation.JSParameter;
import jsuis.script.visitor.JSTaskVisitor;

/**
 * Set task
 * 
 * variable = (type) value;
 * variable = (type) listValue;
 * variable = (type) mapValue;
 * 
 * @author Yassuo Toda
 */
public class JSSetTask extends JSAbstractSetTask {
	
	@JSParameter(name = "name", value = "set")
	@JSParameter(name = "variable", value = "x")
	private Map<String, Object> parameterMap;
	
	@Override
	public void execute() throws Exception {
		
		String variable = getString("variable");
		Object value = getValue();
		
		getBlock().set(variable, value);
	}

	@Override
	public <T> T accept(JSTaskVisitor<T> visitor) {
		return visitor.visitSetTask(this);
	}
}
