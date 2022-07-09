package jsuis.script.task;

import java.util.Map;

/**
 * Terminal task
 * 
 * @author Yassuo Toda
 */
public abstract class JSTerminalTask extends JSTask {
	
	public JSTerminalTask() {
	}
	
	public JSTerminalTask(Map<String, Object> valueMap) {
		super(valueMap);
	}
}
