package jsuis.script.task.general;

import java.util.Map;

import jsuis.lang.JSContinueException;
import jsuis.script.annotation.JSParameter;
import jsuis.script.task.JSTerminalTask;
import jsuis.script.visitor.JSTaskVisitor;

/**
 * Continue task
 * 
 * continue;
 * 
 * @author Yassuo Toda
 */
public class JSContinueTask extends JSTerminalTask {
	
	@JSParameter
	private Map<String, Object> parameterMap;
	
	@Override
	public void execute() throws Exception {
		throw new JSContinueException();
	}
	
	public <T> T accept(JSTaskVisitor<T> visitor) {
		return visitor.visitContinueTask(this);
	}
}
