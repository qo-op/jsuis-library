package jsuis.script.task.general;

import java.util.Map;

import jsuis.lang.JSBreakException;
import jsuis.lang.JSContinueException;
import jsuis.script.annotation.JSParameter;
import jsuis.script.block.JSLoopBlock;
import jsuis.script.task.JSLoopTask;
import jsuis.script.visitor.JSTaskVisitor;

/**
 * For task
 * 
 * for (let counter = start; counter <= end; counter += step) { ... }
 * 
 * @author Yassuo Toda
 */
public class JSForTask extends JSLoopTask {
	
	@JSParameter(name = "counter")
	@JSParameter(name = "start")
	@JSParameter(name = "end")
	@JSParameter(name = "step")
	private Map<String, Object> parameterMap;
	
	@Override
	public void execute() throws Exception {
		
		String counter = nvl(getString("counter"), "i");
		int start = nvl(getInteger("start"), 1);
		int end = nvl(getInteger("end"), 1);
		int step = nvl(getInteger("step"), 1);
		
		JSLoopBlock loopBlock = getLoopBlock();
		for (int i = start; i <= end; i+= step) {
			loopBlock.clear();
			loopBlock.let(counter, i);
			if (!process()) {
				break;
			}
		}
	}
	
	public boolean process() throws Exception {
		try {
			JSLoopBlock loopBlock = getLoopBlock();
			loopBlock.execute();
			return true;
		} catch (JSBreakException e) {
			return false;
		} catch (JSContinueException e) {
			return true;
		}
	}

	@Override
	public <T> T accept(JSTaskVisitor<T> visitor) {
		return visitor.visitForTask(this);
	}
}
