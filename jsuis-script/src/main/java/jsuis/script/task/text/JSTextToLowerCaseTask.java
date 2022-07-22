package jsuis.script.task.text;

import java.util.Map;

import jsuis.script.annotation.JSParameter;
import jsuis.script.task.JSTask;
import jsuis.script.visitor.JSTaskVisitor;

/**
 * Text to lower case task
 * 
 * variable = Text.toLowerCase(text)
 * 
 * @author Yassuo Toda
 */
public class JSTextToLowerCaseTask extends JSTask {
	
	@JSParameter(name = "name", value = "Text.toLowerCase")
	@JSParameter(name = "variable")
	@JSParameter(name = "text")
	private Map<String, Object> parameterMap;

	@Override
	public void execute() throws Exception {
		
		String variable = getString("variable");
		String text = getString("text");
		
		text = text.toLowerCase();
		
		getBlock().set(variable, text);
	}

	@Override
	public <T> T accept(JSTaskVisitor<T> visitor) {
		return visitor.visitTextToLowerCaseTask(this);
	}
}
