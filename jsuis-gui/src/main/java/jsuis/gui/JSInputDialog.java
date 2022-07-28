package jsuis.gui;

import java.awt.Frame;

import javax.swing.JButton;
import javax.swing.JLabel;

import jsuis.util.JSI18n;

/**
 * Input dialog
 * 
 * @author Yassuo Toda
 */
public class JSInputDialog extends JSOptionPane {

	private static final long serialVersionUID = 1L;

	public JSInputDialog(Frame owner) {
		super(owner);
	}
	
	private JButton cancelButton;
	
	@Override
	public JButton getCancelButton() {
		if (cancelButton == null) {
			cancelButton = new JButton(JSI18n.getText(getClass(), "Cancel"));
		}
		return cancelButton;
	}
	
	public JLabel createLabel(String text) {
		return new JLabel(JSI18n.getText(getClass(), text));
	}
}
