package jsuis.script.task.text;

import java.util.Map;
import java.util.regex.Pattern;

import jsuis.script.annotation.JSParameter;
import jsuis.script.task.JSTask;
import jsuis.script.visitor.JSTaskVisitor;

/**
 * Text reverse task
 * 
 * variable = Text.reverse(text)
 * 
 * @author Yassuo Toda
 */
public class JSTextReverseTask extends JSTask {
	
	@JSParameter(name = "name", value = "Text.reverse")
	@JSParameter(name = "variable")
	@JSParameter(name = "text")
	private Map<String, Object> parameterMap;

	@Override
	public void execute() throws Exception {
		
		String variable = getString("variable");
		String text = getString("text");
		
		text = new StringBuilder(text).reverse().toString();
		
		getBlock().set(variable, text);
	}

	private static Pattern combiningDiacriticalMarksPattern;
	
	public static Pattern getCombiningDiacriticalMarksPattern() {
		if (combiningDiacriticalMarksPattern == null) {
			combiningDiacriticalMarksPattern = Pattern.compile("\\p{InCombiningDiacriticalMarks}+");
		}
		return combiningDiacriticalMarksPattern;
	}
	
	@Override
	public <T> T accept(JSTaskVisitor<T> visitor) {
		return visitor.visitTextReverseTask(this);
	}
}
