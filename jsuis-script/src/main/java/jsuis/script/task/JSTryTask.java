package jsuis.script.task;

import java.util.Map;

import jsuis.script.block.JSCatchBlock;
import jsuis.script.block.JSFinallyBlock;
import jsuis.script.block.JSTryBlock;

/**
 * Try task
 * 
 * @author Yassuo Toda
 */
public abstract class JSTryTask extends JSTask {
	
	public JSTryTask() {
	}
	
	public JSTryTask(Map<String, Object> valueMap) {
		super(valueMap);
	}
	
	private JSTryBlock tryBlock;
	
	public JSTryBlock getTryBlock() {
		if (tryBlock == null) {
			tryBlock = new JSTryBlock();
		}
		return tryBlock;
	}

	public JSTryTask setTryBlock(JSTryBlock tryBlock) {
		this.tryBlock = tryBlock;
		return this;
	}
	
	private JSCatchBlock catchBlock;

	public JSCatchBlock getCatchBlock() {
		if (catchBlock == null) {
			catchBlock = new JSCatchBlock();
		}
		return catchBlock;
	}

	public JSTryTask setCatchBlock(JSCatchBlock catchBlock) {
		this.catchBlock = catchBlock;
		return this;
	}
	
	private JSFinallyBlock finallyBlock;

	public JSFinallyBlock getFinallyBlock() {
		if (finallyBlock == null) {
			finallyBlock = new JSFinallyBlock();
		}
		return finallyBlock;
	}

	public JSTryTask setFinallyBlock(JSFinallyBlock finallyBlock) {
		this.finallyBlock = finallyBlock;
		return this;
	}
}
