package jsuis.script.task.text;

import java.util.Map;

import jsuis.script.annotation.JSParameter;
import jsuis.script.executor.JSTextNormalize;
import jsuis.script.task.JSTask;
import jsuis.script.visitor.JSTaskVisitor;

/**
 * Text normalize task
 * 
 * @author Yassuo Toda
 */
public class JSTextNormalizeTask extends JSTask {
	
	@JSParameter(name = "variable")
	@JSParameter(name = "text")
	private Map<String, Object> parameterMap;

	@Override
	public void execute() throws Exception {
		
		String variable = getString("variable");
		String text = getString("text");
		
		String result = new JSTextNormalize()
				.text(text)
				.execute();
		
		getBlock().set(variable, result);
	}
	
	@Override
	public <T> T accept(JSTaskVisitor<T> visitor) {
		return visitor.visitTextNormalizeTask(this);
	}
}
