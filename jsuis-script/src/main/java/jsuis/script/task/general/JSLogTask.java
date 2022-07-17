package jsuis.script.task.general;

import java.util.Map;

import jsuis.script.annotation.JSParameter;
import jsuis.script.task.JSTask;
import jsuis.script.visitor.JSTaskVisitor;

/**
 * Log task
 * 
 * System.out.println(text);
 * 
 * @author Yassuo Toda
 */
public class JSLogTask extends JSTask {
	
	@JSParameter(name = "name", value = "log")
	@JSParameter(name = "text")
	private Map<String, Object> parameterMap;
	
	@Override
	public void execute() throws Exception {
		
		String text = getString("text");
		
		System.out.println(text);
	}

	@Override
	public <T> T accept(JSTaskVisitor<T> visitor) {
		return visitor.visitLogTask(this);
	}
}
