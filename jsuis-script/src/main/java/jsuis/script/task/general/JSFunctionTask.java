package jsuis.script.task.general;

import java.util.Map;

import jsuis.script.annotation.JSParameter;
import jsuis.script.visitor.JSTaskVisitor;

/**
 * Function task
 * 
 * function function([ [ "type", "name", ... ], [ type, name, ... ], ... ]) { ... }
 * 
 * @author Yassuo Toda
 */
public class JSFunctionTask extends JSAbstractFunctionTask {
	
	@JSParameter(name = "name", value = "function")
	@JSParameter(name = "function", value = "f")
	private Map<String, Object> parameterMap;
	
	@Override
	public void execute() throws Exception {
		
		super.execute();
		
		String function = getString("function");
		
		getBlock().let(function + "()", this);
	}

	@Override
	public <T> T accept(JSTaskVisitor<T> visitor) {
		return visitor.visitFunctiontTask(this);
	}
}
