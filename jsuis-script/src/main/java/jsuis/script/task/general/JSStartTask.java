package jsuis.script.task.general;

import java.util.Map;

import jsuis.script.annotation.JSParameter;
import jsuis.script.visitor.JSTaskVisitor;

/**
 * Start task
 * 
 * function ([ [ "type", "name", ... ], [ type, name, ... ], ... ]) { ... }
 * 
 * @author Yassuo Toda
 */
public class JSStartTask extends JSAbstractFunctionTask {
	
	@JSParameter(name = "name", value = "start")
	private Map<String, Object> parameterMap;
	
	@Override
	public <T> T accept(JSTaskVisitor<T> visitor) {
		return visitor.visitStartTask(this);
	}
}
