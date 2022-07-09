package jsuis.script.task;

import java.util.Map;

import jsuis.script.block.JSLoopBlock;

public abstract class JSLoopTask extends JSTask {

	public JSLoopTask() {
	}
	
	public JSLoopTask(Map<String, Object> valueMap) {
		super(valueMap);
	}
	
	private JSLoopBlock loopBlock;

	public JSLoopBlock getLoopBlock() {
		if (loopBlock == null) {
			loopBlock = new JSLoopBlock();
		}
		return loopBlock;
	}

	public JSLoopTask setLoopBlock(JSLoopBlock loopBlock) {
		this.loopBlock = loopBlock;
		return this;
	}
}
