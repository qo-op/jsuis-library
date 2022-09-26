package jsuis.script.executor;

/**
 * Log executor
 * 
 * @author Yassuo Toda
 */
public class JSLog extends JSExecutor<Void> {

	private String text = "";
	
	public JSLog text(String text) {
		this.text = text;
		return this;
	}
	
	public Void result() {
		return null;
	}
	
	public void run() throws Exception {
		JSLog.log(text);
	}
	
	public static void log(String text) {
		System.out.println(text);
	}
}
