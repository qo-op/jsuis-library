package jsuis.lang;

/**
 * Return exception
 * 
 * @author Yassuo Toda
 */
public class JSReturnException extends Exception {
	
	private static final long serialVersionUID = 1L;

	private Object result;
	
	public JSReturnException(Object result) {
		this.result = result;
	}
	
	public Object getResult() {
		return result;
	}
}
