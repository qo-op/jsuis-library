package jsuis.script.task.general;

import java.util.Map;

import jsuis.script.annotation.JSParameter;
import jsuis.script.executor.JSEval;
import jsuis.script.task.JSTask;
import jsuis.script.visitor.JSTaskVisitor;

/**
 * Eval task
 * 
 * @author Yassuo Toda
 */
public class JSEvalTask extends JSTask {
	
	@JSParameter(name = "variable")
	@JSParameter(required = true, type = String.class, name = "script", component = "Text")
	private Map<String, Object> parameterMap;
	
	@Override
	public void execute() throws Exception {
		
		String variable = getString("variable");
		String script = getString("script");
		
		Object result = new JSEval()
				.script(script)
				.execute();
		
		if (variable != null && !variable.trim().isEmpty()) {
			getBlock().set(variable, result);
		}
	}

	@Override
	public <T> T accept(JSTaskVisitor<T> visitor) {
		return visitor.visitEvalTask(this);
	}
}
