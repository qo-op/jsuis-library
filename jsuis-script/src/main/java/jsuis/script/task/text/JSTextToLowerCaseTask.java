package jsuis.script.task.text;

import java.util.Map;

import jsuis.script.annotation.JSParameter;
import jsuis.script.executor.JSTextToLowerCase;
import jsuis.script.task.JSTask;
import jsuis.script.visitor.JSTaskVisitor;

/**
 * Text to lower case task
 * 
 * @author Yassuo Toda
 */
public class JSTextToLowerCaseTask extends JSTask {
	
	@JSParameter(required = true, name = "variable")
	@JSParameter(required = true, name = "text")
	private Map<String, Object> parameterMap;

	@Override
	public void execute() throws Exception {
		
		String variable = getString("variable");
		String text = getString("text");
		
		String result = new JSTextToLowerCase()
				.text(text)
				.execute();
		
		getBlock().set(variable, result);
	}

	@Override
	public <T> T accept(JSTaskVisitor<T> visitor) {
		return visitor.visitTextToLowerCaseTask(this);
	}
}
