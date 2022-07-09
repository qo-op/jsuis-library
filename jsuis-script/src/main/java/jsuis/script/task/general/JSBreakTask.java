package jsuis.script.task.general;

import java.util.Map;

import jsuis.lang.JSBreakException;
import jsuis.script.annotation.JSParameter;
import jsuis.script.task.JSTerminalTask;
import jsuis.script.visitor.JSTaskVisitor;

/**
 * Break task
 * 
 * break;
 * 
 * @author Yassuo Toda
 */
public class JSBreakTask extends JSTerminalTask {

	public JSBreakTask() {
	}
	
	public JSBreakTask(Map<String, Object> valueMap) {
		super(valueMap);
	}
	
	@JSParameter(name = "name", value = "break")
	private Map<String, Object> valueMap;
	
	@Override
	public void execute() throws Exception {
		throw new JSBreakException();
	}
	
	public <T> T accept(JSTaskVisitor<T> visitor) {
		return visitor.visitBreakTask(this);
	}
}
