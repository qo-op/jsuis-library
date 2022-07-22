package jsuis;

import java.awt.BorderLayout;
import java.awt.Frame;

import javax.swing.JPanel;
import javax.swing.JTextArea;
import javax.swing.border.EmptyBorder;

/**
 * Message dialog
 * 
 * @author Yassuo Toda
 */
public class JSMessageDialog extends JSOptionPane {

	private static final long serialVersionUID = 1L;

	public JSMessageDialog(Frame owner) {
		super(owner);
	}
	
	private JPanel panel;
	
	@Override
	public JPanel getPanel() {
		if (panel == null) {
			panel = new JPanel(new BorderLayout());
			panel.setBorder(new EmptyBorder(0, 0, 5, 0));
			JTextArea textArea = getTextArea();
			textArea.setBackground(panel.getBackground());
			panel.add(textArea);
		}
		return panel;
	}
	
	private JTextArea textArea;
	
	public JTextArea getTextArea() {
		if (textArea == null) {
			textArea = new JTextArea();
			textArea.setEditable(false);
		}
		return textArea;
	}
	
	public void showMessageDialog(String message) {
		getTextArea().setText(message);
		super.showDialog();
		dispose();
	}
}
