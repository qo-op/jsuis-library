package jsuis.script.task.general;

import java.util.Map;

import jsuis.script.annotation.JSParameter;
import jsuis.script.visitor.JSTaskVisitor;

/**
 * Function task
 * 
 * @author Yassuo Toda
 */
public class JSFunctionTask extends JSAbstractFunctionTask {
	
	@JSParameter(required = true, name = "function")
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
