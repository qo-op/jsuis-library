package jsuis.script.task.text;

import java.util.Map;

import jsuis.script.annotation.JSParameter;
import jsuis.script.task.JSTask;
import jsuis.script.visitor.JSTaskVisitor;

/**
 * Text slice task
 * 
 * variable = Text.slice(text, start)
 * variable = Text.slice(text, start, end)
 * 
 * @author Yassuo Toda
 */
public class JSTextSliceTask extends JSTask {
	
	@JSParameter(name = "name", value = "Text.slice")
	@JSParameter(name = "variable")
	@JSParameter(name = "text")
	@JSParameter(name = "start", value = "0")
	@JSParameter(name = "end")
	private Map<String, Object> parameterMap;

	@Override
	public void execute() throws Exception {
		
		String variable = getString("variable");
		String text = getString("text");
		Integer start = getInteger("start");
		Integer end = getInteger("end");
		
		int length = text.length();
		if (start > length) {
			start = length;
		} else if (start < 0) {
			start = Math.max(start + length, 0);
		}
		if (end == null || end > length) {
			end = length;
		} else if (end < 0) {
			end = Math.max(end + length, 0);
		}
		if (start > end) {
			start = end;
		}
		text = text.substring(start, end);
		
		getBlock().set(variable, text);
	}

	@Override
	public <T> T accept(JSTaskVisitor<T> visitor) {
		return visitor.visitTextSliceTask(this);
	}
}
