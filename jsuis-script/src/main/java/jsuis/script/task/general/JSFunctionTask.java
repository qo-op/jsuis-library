package jsuis.script.task.general;

import java.util.Map;

import jsuis.script.annotation.JSParameter;
import jsuis.script.block.JSBlock;
import jsuis.script.visitor.JSTaskVisitor;

/**
 * Function task
 * 
 * function function([ [ "argumentType", "argumentName", "argumentValue", ... ], [ argumentType, argumentName, argumentValue, ... ], [ argumentType, ... ], ... ]) { ... }
 * 
 * @author Yassuo Toda
 */
public class JSFunctionTask extends JSAbstractFunctionTask {

	public JSFunctionTask() {
	}
	
	public JSFunctionTask(Map<String, Object> valueMap) {
		super(valueMap);
	}
	
	@JSParameter(name = "name", value = "function")
	@JSParameter(name = "function", value = "f")
	private Map<String, Object> valueMap;
	
	@Override
	public void execute() throws Exception {
		
		super.execute();
		
		String function = getString("function");
		
		JSBlock block = getBlock();
		block.put(function + "()", this);
	}

	@Override
	public <T> T accept(JSTaskVisitor<T> visitor) {
		return visitor.visitFunctiontTask(this);
	}
}
