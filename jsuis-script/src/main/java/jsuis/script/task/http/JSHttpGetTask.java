package jsuis.script.task.http;

import java.util.Map;

import jsuis.script.annotation.JSParameter;
import jsuis.script.executor.JSHttpGet;
import jsuis.script.task.JSTask;
import jsuis.script.visitor.JSTaskVisitor;

/**
 * Http get task
 * 
 * @author Yassuo Toda
 */
public class JSHttpGetTask extends JSTask {
	
	@JSParameter(name = "variable")
	@JSParameter(required = true, name = "url")
	@JSParameter(type = Map.class, name = "parameters")
	@JSParameter(name = "timeout", value = "0")
	@JSParameter(type = Map.class, name = "headers")
	@JSParameter(type = Map.class, name = "cookies")
	private Map<String, Object> parameterMap;
	
	@Override
	public void execute() throws Exception {
		
		String variable = getString("variable");
		String url = getString("url");
		Map<String, String> parameters = getMap("parameters", String.class);
		Integer timeout = getInteger("timeout");
		Map<String, String> headers = getMap("headers", String.class);
		Map<String, String> cookies = getMap("cookies", String.class);
		
		Object result = new JSHttpGet()
				.url(url)
				.parameters(parameters)
				.timeout(timeout)
				.headers(headers)
				.cookies(cookies)
				.execute();
		
		if (variable != null && !variable.isEmpty()) {
			getBlock().set(variable, result);
		}
	}

	@Override
	public <T> T accept(JSTaskVisitor<T> visitor) {
		return visitor.visitHttpGetTask(this);
	}
}
