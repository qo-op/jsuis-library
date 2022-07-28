package jsuis.script.block;

import java.util.List;

import jsuis.script.task.JSTask;

/**
 * Try block
 * 
 * @author Yassuo Toda
 */
public class JSTryBlock extends JSBlock {

	public JSTryBlock() {
	}
	
	public JSTryBlock(List<JSTask> taskList) {
		super(taskList);
	}
}
