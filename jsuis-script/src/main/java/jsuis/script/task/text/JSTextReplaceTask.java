package jsuis.script.task.text;

import java.util.Map;

import jsuis.script.annotation.JSParameter;
import jsuis.script.task.JSTask;
import jsuis.script.visitor.JSTaskVisitor;

/**
 * Text replace task
 * 
 * var variable = Text.replace(text, target, replacement)
 * var variable = Text.replace(text, target, replacement, regex)
 * 
 * @author Yassuo Toda
 */
public class JSTextReplaceTask extends JSTask {
	
	@JSParameter(name = "name", value = "Text.replace")
	@JSParameter(name = "variable", value = "text")
	@JSParameter(name = "text")
	@JSParameter(name = "target")
	@JSParameter(name = "replacement")
	@JSParameter(type = Boolean.class, name = "regex", value = "false")
	private Map<String, Object> parameterMap;

	@Override
	public void execute() throws Exception {
		
		String variable = getString("variable");
		String text = getString("text");
		String target = getString("target");
		String replacement = nvl(getString("replacement"), "");
		boolean regex = getBoolean("regex");
		
		if (regex) {
			text = text.replaceAll(target, replacement);
		} else {
			text = text.replace(target, replacement);
		}
		
		getBlock().var(variable, text);
	}

	@Override
	public <T> T accept(JSTaskVisitor<T> visitor) {
		return visitor.visitTextReplaceTask(this);
	}
}
