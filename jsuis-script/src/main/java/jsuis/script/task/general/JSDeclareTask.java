package jsuis.script.task.general;

import java.util.Map;

import jsuis.script.annotation.JSParameter;
import jsuis.script.visitor.JSTaskVisitor;

/**
 * Declare task
 * 
 * let variable = (type) value;
 * let variable = (type) listValue;
 * let variable = (type) mapValue;
 * 
 * @author Yassuo Toda
 */
public class JSDeclareTask extends JSAbstractSetTask {
	
	@JSParameter(name = "name", value = "declare")
	@JSParameter(name = "variable", value = "x")
	private Map<String, Object> parameterMap;
	
	@Override
	public void execute() throws Exception {
		
		String variable = getString("variable");
		Object value = getValue();
		
		getBlock().let(variable, value);
	}

	@Override
	public <T> T accept(JSTaskVisitor<T> visitor) {
		return visitor.visitDeclareTask(this);
	}
}
