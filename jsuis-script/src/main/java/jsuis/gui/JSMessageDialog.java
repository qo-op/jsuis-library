package jsuis.gui;

import java.awt.BorderLayout;
import java.awt.Frame;

import javax.swing.JPanel;
import javax.swing.JTextPane;
import javax.swing.border.EmptyBorder;

import jsuis.util.JSI18n;
import jsuis.util.NVL;

/**
 * Message dialog
 * 
 * @author Yassuo Toda
 */
public class JSMessageDialog extends JSOptionPane {

	private static final long serialVersionUID = 1L;

	private String message;
	
	public JSMessageDialog(Frame owner, String message, String title) {
		super(owner);
		this.message = message;
		setTitle(NVL.nvl(title, JSI18n.getText(getClass(), "Message")));
		add(getPanel());
	}
	
	private JPanel panel;
	
	public JPanel getPanel() {
		if (panel == null) {
			panel = new JPanel(new BorderLayout(4, 4));
			panel.setBorder(new EmptyBorder(4, 4, 4, 4));
			JTextPane textPane = getTextPane();
			textPane.setBackground(panel.getBackground());
			textPane.setText(message);
			panel.add(textPane);
			panel.add(getButtonPanel(), BorderLayout.SOUTH);
		}
		return panel;
	}
	
	private JTextPane textPane;
	
	public JTextPane getTextPane() {
		if (textPane == null) {
			textPane = new JTextPane();
			textPane.setContentType("text/html");
			textPane.setEditable(false);
		}
		return textPane;
	}
}
