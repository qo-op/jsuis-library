package jsuis.script.task.text;

import java.text.Normalizer;
import java.util.Map;
import java.util.regex.Pattern;

import jsuis.script.annotation.JSParameter;
import jsuis.script.task.JSTask;
import jsuis.script.visitor.JSTaskVisitor;

/**
 * Text normalize task
 * 
 * variable = Text.toLowerCase(text)
 * 
 * @author Yassuo Toda
 */
public class JSTextNormalizeTask extends JSTask {
	
	@JSParameter(name = "name", value = "Text.normalize")
	@JSParameter(name = "variable")
	@JSParameter(name = "text")
	private Map<String, Object> parameterMap;

	@Override
	public void execute() throws Exception {
		
		String variable = getString("variable");
		String text = getString("text");
		
		text = Normalizer.normalize(text, Normalizer.Form.NFD);
		text = getCombiningDiacriticalMarksPattern().matcher(text).replaceAll("");
		
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
		return visitor.visitTextNormalizeTask(this);
	}
}
