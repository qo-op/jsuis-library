package jsuis.script.task.general;

import java.util.Map;

import jsuis.script.annotation.JSParameter;
import jsuis.script.visitor.JSTaskVisitor;

/**
 * Declare task
 * 
 * let variable = new type(value);
 * let variable = new type(listValue); // type = 'List'
 * let variable = new type(mapValue); // type = 'Map'
 * 
 * @author Yassuo Toda
 */
public class JSLetTask extends JSAbstractSetTask {
	
	@JSParameter(name = "variable")
	private Map<String, Object> parameterMap;
	
	@Override
	public void execute() throws Exception {
		
		String variable = getString("variable");
		Object value = getValue();
		
		getBlock().let(variable, value);
	}

	@Override
	public <T> T accept(JSTaskVisitor<T> visitor) {
		return visitor.visitLetTask(this);
	}
}
