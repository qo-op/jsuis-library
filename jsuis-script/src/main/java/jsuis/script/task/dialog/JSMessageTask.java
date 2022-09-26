package jsuis.script.task.dialog;

import java.util.Map;

import jsuis.script.annotation.JSParameter;
import jsuis.script.executor.JSMessage;
import jsuis.script.task.JSTask;
import jsuis.script.visitor.JSTaskVisitor;

/**
 * Message task
 * 
 * @author Yassuo Toda
 */
public class JSMessageTask extends JSTask {
	
	@JSParameter(name = "text")
	@JSParameter(name = "title")
	private Map<String, Object> parameterMap;
	
	@Override
	public void execute() throws Exception {
		
		String text = getString("text");
		String title = getString("title");
		if (title != null && title.isEmpty()) {
			title = null;
		}
		
		new JSMessage()
		.text(text)
		.title(title)
		.execute();
	}

	@Override
	public <T> T accept(JSTaskVisitor<T> visitor) {
		return visitor.visitMessageTask(this);
	}
}
