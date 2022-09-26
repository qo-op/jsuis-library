package jsuis.script.task;

import jsuis.script.block.JSLoopBlock;

public abstract class JSLoopTask extends JSTask {
	
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
