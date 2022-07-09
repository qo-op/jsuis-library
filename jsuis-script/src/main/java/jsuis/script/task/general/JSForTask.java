package jsuis.script.task.general;

import java.util.Map;

import jsuis.lang.JSBreakException;
import jsuis.script.annotation.JSParameter;
import jsuis.script.block.JSLoopBlock;
import jsuis.script.task.JSLoopTask;
import jsuis.script.visitor.JSTaskVisitor;

/**
 * For task
 * 
 * for (let counter = start; counter <= end; counter += step ) {
 * }
 * 
 * @author Yassuo Toda
 */
public class JSForTask extends JSLoopTask {

	public JSForTask() {
	}
	
	public JSForTask(Map<String, Object> valueMap) {
		super(valueMap);
	}
	
	@JSParameter(name = "name", value = "for")
	@JSParameter(name = "counter", value = "i")
	@JSParameter(name = "start", value = "1")
	@JSParameter(name = "end", value = "1")
	@JSParameter(name = "step", value = "1")
	private Map<String, Object> valueMap;
	
	@Override
	public void execute() throws Exception {
		
		String counter = getString("counter");
		int start = getInteger("start");
		int end = getInteger("end");
		int step = getInteger("step");
		
		JSLoopBlock loopBlock = getLoopBlock();
		loopBlock.clear();
		loopBlock.put(counter, start);
		for (int i = start; i <= end; i+= step) {
			loopBlock.put(counter, i);
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
		}
	}

	@Override
	public <T> T accept(JSTaskVisitor<T> visitor) {
		return visitor.visitForTask(this);
	}
}
