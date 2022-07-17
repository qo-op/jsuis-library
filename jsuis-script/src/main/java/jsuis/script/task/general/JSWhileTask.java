package jsuis.script.task.general;

import java.util.Map;

import jsuis.lang.JSBreakException;
import jsuis.script.annotation.JSParameter;
import jsuis.script.block.JSLoopBlock;
import jsuis.script.task.JSLoopTask;
import jsuis.script.visitor.JSTaskVisitor;

/**
 * While task
 * 
 * while (condition) { ... }
 * 
 * @author Yassuo Toda
 */
public class JSWhileTask extends JSLoopTask {
	
	@JSParameter(name = "name", value = "while")
	@JSParameter(name = "condition", value = "false")
	private Map<String, Object> parameterMap;
	
	@Override
	public void execute() throws Exception {
		JSLoopBlock loopBlock = getLoopBlock();
		do {
			loopBlock.clear();
		} while (process());
	}

	public boolean process() throws Exception {
		
		boolean condition = getBoolean("condition");
		
		if (condition) {
			try {
				JSLoopBlock loopBlock = getLoopBlock();
				loopBlock.execute();
				return true;
			} catch (JSBreakException e) {
				return false;
			}
		} else {
			return false;
		}
	}

	@Override
	public <T> T accept(JSTaskVisitor<T> visitor) {
		return visitor.visitWhileTask(this);
	}
}
