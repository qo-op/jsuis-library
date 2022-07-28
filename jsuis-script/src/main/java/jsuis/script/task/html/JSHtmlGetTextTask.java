package jsuis.script.task.html;

import java.util.Map;

import jsuis.script.annotation.JSParameter;
import jsuis.script.executor.JSHtmlGetText;
import jsuis.script.task.JSTask;
import jsuis.script.visitor.JSTaskVisitor;

/**
 * Html get texts
 * 
 * @author Yassuo Toda
 */
public class JSHtmlGetTextTask extends JSTask {
	
	@JSParameter(required = true, name = "variable")
	@JSParameter(required = true, name = "html")
	@JSParameter(required = true, name = "xpath")
	private Map<String, Object> parameterMap;
	
	@Override
	public void execute() throws Exception {
		
		String variable = getString("variable");
		String html = getString("html");
		String xpath = getString("xpath");
		
		String result = new JSHtmlGetText()
				.html(html)
				.xpath(xpath)
				.execute();
		
		getBlock().set(variable, result);
	}

	@Override
	public <T> T accept(JSTaskVisitor<T> visitor) {
		return visitor.visitHtmlGetElementsTask(this);
	}
}
