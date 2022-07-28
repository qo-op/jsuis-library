package jsuis.script.task;

import jsuis.script.block.JSElseBlock;
import jsuis.script.block.JSIfBlock;

/**
 * Conditional task
 * 
 * @author Yassuo Toda
 */
public abstract class JSConditionalTask extends JSTask {

	private JSIfBlock ifBlock;

	public JSIfBlock getIfBlock() {
		if (ifBlock == null) {
			ifBlock = new JSIfBlock();
		}
		return ifBlock;
	}

	public JSConditionalTask setIfBlock(JSIfBlock ifBlock) {
		this.ifBlock = ifBlock;
		return this;
	}

	private JSElseBlock elseBlock;
	
	public JSElseBlock getElseBlock() {
		if (elseBlock == null) {
			elseBlock = new JSElseBlock();
		}
		return elseBlock;
	}

	public JSConditionalTask setElseBlock(JSElseBlock elseBlock) {
		this.elseBlock = elseBlock;
		return this;
	}
}
