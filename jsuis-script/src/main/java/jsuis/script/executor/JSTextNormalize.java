package jsuis.script.executor;

import java.text.Normalizer;
import java.util.regex.Pattern;

import jsuis.script.annotation.JSRequired;

/**
 * Text normalize executor
 * 
 * @author Yassuo Toda
 */
public class JSTextNormalize extends JSExecutor<String> {

	@JSRequired private String text;
	private String result;
	
	public JSTextNormalize text(String text) {
		this.text = text;
		return this;
	}

	public String result() {
		return result;
	}
	
	public void run() {
		
		String normalized = Normalizer.normalize((String) text, Normalizer.Form.NFD);
		normalized = getCombiningDiacriticalMarksPattern().matcher(normalized).replaceAll("");
		result = normalized;
	}
	
	private static Pattern combiningDiacriticalMarksPattern;
	
	public static Pattern getCombiningDiacriticalMarksPattern() {
		if (combiningDiacriticalMarksPattern == null) {
			combiningDiacriticalMarksPattern = Pattern.compile("\\p{InCombiningDiacriticalMarks}+");
		}
		return combiningDiacriticalMarksPattern;
	}
}
