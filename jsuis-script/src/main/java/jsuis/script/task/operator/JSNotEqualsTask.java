package jsuis.script.task.operator;

import java.util.Map;

import jsuis.script.annotation.JSParameter;
import jsuis.script.executor.JSNotEquals;
import jsuis.script.task.JSTask;
import jsuis.script.visitor.JSTaskVisitor;

/**
 * Return task
 * 
 * @author Yassuo Toda
 */
public class JSNotEqualsTask extends JSTask {
	
	@JSParameter(required = true, type = Boolean.class, name = "variable")
	@JSParameter(required = true, type = Object.class, name = "o1")
	@JSParameter(required = true, type = Object.class, name = "o2")
	private Map<String, Object> parameterMap;

	@Override
	public void execute() throws Exception {
		
		String variable = getString("variable");
		Object o1 = getObject("o1");
		Object o2 = getObject("o2");
		
		Boolean result = new JSNotEquals()
				.o1(o1)
				.o2(o2)
				.execute();
		
		getBlock().set(variable, result);
	}
	
	public <T> T accept(JSTaskVisitor<T> visitor) {
		return visitor.visitNotEqualsTask(this);
	}
}
