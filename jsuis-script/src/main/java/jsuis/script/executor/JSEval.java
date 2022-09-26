package jsuis.script.executor;

import jsuis.script.annotation.JSRequired;
import jsuis.script.engine.JSScriptEngine;

/**
 * Eval executor
 * 
 * @author Yassuo Toda
 */
public class JSEval extends JSExecutor<Object> {

	@JSRequired private String script;
	private Object result;

	public JSEval script(String script) {
		this.script = script;
		return this;
	}
	
	public Object result() {
		return result;
	}
	
	public void run() throws Exception {
		
		if (script != null && !script.trim().isEmpty()) {
			result = JSScriptEngine.getInstance().eval(script);
		}
	}
}
