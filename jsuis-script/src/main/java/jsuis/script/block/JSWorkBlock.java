package jsuis.script.block;

import java.util.List;
import java.util.Map;

import jsuis.script.task.JSTask;
import jsuis.script.task.general.JSCallTask;
import jsuis.script.task.general.JSStartTask;

/**
 * Work block
 * 
 * @author Yassuo Toda
 */
public class JSWorkBlock extends JSBlock {

	public JSWorkBlock() {
	}
	
	public JSWorkBlock(List<JSTask> taskList) {
		super(taskList);
	}
	
	@Override
	public void execute() throws Exception {
		execute(this, null);
	}
	
	public Object execute(Map<String, Object> valueMap) throws Exception {
		return execute(this, valueMap);
	}
	
	public Object execute(JSBlock block, Map<String, Object> valueMap) throws Exception {
		JSStartTask startTask = null;
		List<JSTask> taskList = getTaskList();
		for (JSTask task : taskList) {
			task.setBlock(this);
			if (task instanceof JSStartTask) {
				startTask = (JSStartTask) task;
			}
			task.execute();
		}
		if (startTask != null) {
			return JSCallTask.execute(block, startTask, valueMap);
		}
		return null;
	}
}
