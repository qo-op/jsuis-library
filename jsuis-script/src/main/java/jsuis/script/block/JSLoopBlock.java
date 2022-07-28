package jsuis.script.block;

import java.util.List;

import jsuis.script.task.JSTask;

/**
 * Loop block
 * 
 * @author Yassuo Toda
 */
public class JSLoopBlock extends JSBlock {

	public JSLoopBlock() {
	}
	
	public JSLoopBlock(List<JSTask> taskList) {
		super(taskList);
	}
}
