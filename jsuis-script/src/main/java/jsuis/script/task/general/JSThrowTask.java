package jsuis.script.task.general;

import java.util.Map;

import jsuis.script.annotation.JSParameter;
import jsuis.script.task.JSTerminalTask;
import jsuis.script.visitor.JSTaskVisitor;

/**
 * Throw task
 * 
 * throw exception;
 * 
 * @author Yassuo Toda
 */
public class JSThrowTask extends JSTerminalTask {
	
	public JSThrowTask() {
	}
	
	public JSThrowTask(Map<String, Object> valueMap) {
		super(valueMap);
	}

	@JSParameter(name = "name", value = "throw")
	@JSParameter(name = "exception")
	private Map<String, Object> valueMap;
	
	@Override
	public void execute() throws Exception {
		
		String exception = getString("exception");
		
		if (exception != null) {
			throw new Exception(exception);
		} else {
			throw new Exception();
		}
	}

	@Override
	public <T> T accept(JSTaskVisitor<T> visitor) {
		return visitor.visitThrowTask(this);
	}
}
