package jsuis.script.task.text;

import java.util.Map;

import jsuis.script.annotation.JSParameter;
import jsuis.script.task.JSTask;
import jsuis.script.visitor.JSTaskVisitor;

/**
 * Text to upper case task
 * 
 * variable = Text.toUpperCase(text)
 * 
 * @author Yassuo Toda
 */
public class JSTextToUpperCaseTask extends JSTask {
	
	@JSParameter(name = "name", value = "Text.toUpperCase")
	@JSParameter(name = "variable")
	@JSParameter(name = "text")
	private Map<String, Object> parameterMap;

	@Override
	public void execute() throws Exception {
		
		String variable = getString("variable");
		String text = getString("text");
		
		text = text.toUpperCase();
		
		getBlock().set(variable, text);
	}

	@Override
	public <T> T accept(JSTaskVisitor<T> visitor) {
		return visitor.visitTextToUpperCaseTask(this);
	}
}
