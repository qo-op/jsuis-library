package jsuis.script.executor;

import jsuis.script.annotation.JSRequired;

/**
 * Text to lower case executor
 * 
 * @author Yassuo Toda
 */
public class JSTextToLowerCase extends JSExecutor<String> {

	@JSRequired private Object text;
	private String result;
	
	public JSTextToLowerCase text(Object text) {
		this.text = text;
		return this;
	}

	public String result() {
		return result;
	}
	
	public void run() {
		
		result = ((String) text).toLowerCase();
	}
}
