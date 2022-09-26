package jsuis.script.executor;

import jsuis.script.annotation.JSRequired;

/**
 * Not equals executor
 * 
 * @author Yassuo Toda
 */
public class JSNotEquals extends JSExecutor<Boolean> {

	@JSRequired private Object o1;
	@JSRequired private Object o2;
	private Boolean result;

	public JSNotEquals o1(Object o1) {
		this.o1 = o1;
		return this;
	}
	
	public JSNotEquals o2(Object o2) {
		this.o2 = o2;
		return this;
	}
	
	public Boolean result() {
		return result;
	}
	
	public void run() throws Exception {

		if (o1 instanceof Object) {
			result = !o1.equals(o2);
		} else if (o2 instanceof Object) {
			result = !o2.equals(o1);
		} else {
			result = o1 != o2;
		}
	}
}
