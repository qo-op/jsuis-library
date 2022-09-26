package jsuis.script.executor;

import java.awt.Frame;

import jsuis.gui.JSOptionPane;

/**
 * Message executor
 * 
 * @author Yassuo Toda
 */
public class JSMessage extends JSExecutor<Void> {

	private String text = "";
	private String title;
	private Frame frame;
	
	public JSMessage text(String text) {
		this.text = text;
		return this;
	}
	
	public JSMessage title(String title) {
		this.title = title;
		return this;
	}
	
	public JSMessage owner(Frame frame) {
		this.frame = frame;
		return this;
	}
	
	public Void result() {
		return null;
	}
	
	public void run() throws Exception {
		JSOptionPane.showMessageDialog(frame, text, title);
	}
	
	public static void message(String text) {
		JSOptionPane.showMessageDialog(null, text, null);
	}
	
	public static void message(String text, String title) {
		JSOptionPane.showMessageDialog(null, text, title);
	}
}
