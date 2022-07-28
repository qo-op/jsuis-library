package jsuis.gui;

import java.awt.Frame;

import javax.swing.JDialog;

/**
 * Dialog
 * 
 * @author Yassuo Toda
 */
public class JSDialog extends JDialog {

	private static final long serialVersionUID = 1L;
	
	public JSDialog(Frame frame, boolean modal) {
		super(frame, modal);
	}
}
