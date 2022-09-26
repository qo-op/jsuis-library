package jsuis.script.executor;

import jsuis.script.annotation.JSRequired;

/**
 * Text slice executor
 * 
 * @author Yassuo Toda
 */
public class JSTextSlice extends JSExecutor<String> {

	@JSRequired private Object text;
	private Integer start = 0;
	private Integer end;
	private String result;
	
	public JSTextSlice text(Object text) {
		this.text = text;
		return this;
	}
	
	public JSTextSlice start(Integer start) {
		this.start = start;
		return this;
	}
	
	public JSTextSlice end(Integer end) {
		this.end = end;
		return this;
	}
	
	public String result() {
		return result;
	}
	
	public void run() throws Exception {
		
		int length = ((String) text).length();
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
		result = ((String) text).substring(start, end);
	}
}
