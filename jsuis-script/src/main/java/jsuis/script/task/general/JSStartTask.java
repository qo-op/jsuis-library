package jsuis.script.task.general;

import java.util.Map;

import jsuis.script.annotation.JSParameter;
import jsuis.script.visitor.JSTaskVisitor;

/**
 * Start task
 * 
 * @author Yassuo Toda
 */
public class JSStartTask extends JSAbstractFunctionTask {

	public JSStartTask() {
	}
	
	public JSStartTask(Map<String, Object> valueMap) {
		super(valueMap);
	}
	
	@JSParameter(name = "name", value = "start")
	private Map<String, Object> valueMap;
	
	@Override
	public <T> T accept(JSTaskVisitor<T> visitor) {
		return visitor.visitStartTask(this);
	}
}
