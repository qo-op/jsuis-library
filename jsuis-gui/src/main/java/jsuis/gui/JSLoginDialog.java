package jsuis.gui;

import java.awt.Frame;
import java.awt.GridBagConstraints;
import java.awt.GridBagLayout;
import java.awt.Insets;
import java.util.Arrays;

import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JPasswordField;
import javax.swing.JTextField;
import javax.swing.JTextPane;
import javax.swing.border.EmptyBorder;

import jsuis.util.JSI18n;

/**
 * Input dialog
 * 
 * Based on the example found at https://docs.oracle.com/javase/tutorial/uiswing/components/passwordfield.html
 * 
 * @author Yassuo Toda
 */
public class JSLoginDialog extends JSInputDialog {

	private static final long serialVersionUID = 1L;

	public static final int USERNAME_AND_PASSWORD = 0;
	public static final int USERNAME = 1;
	public static final int PASSWORD = 2;
	
	private int type;
	private String message;
	private String defaultUsername;
	
	public JSLoginDialog(Frame owner, int type, String message, String defaultUsername) {
		super(owner);
		setTitle(JSI18n.getText(getClass(), "Login"));
		this.type = type;
		this.message = message;
		this.defaultUsername = defaultUsername;
		add(getPanel());
	}
	
	private JPanel panel;
	
	public JPanel getPanel() {
		if (panel == null) {
			panel = new JPanel(new GridBagLayout());
			panel.setBorder(new EmptyBorder(4, 4, 4, 4));
			GridBagConstraints constraints = new GridBagConstraints();
			constraints.anchor = GridBagConstraints.LINE_START;
			constraints.gridx = 0;
			constraints.insets = new Insets(0, 0, 2, 0);
			if (message != null) {
				JTextPane textPane = getTextPane();
				textPane.setBackground(panel.getBackground());
				textPane.setText(message);
				panel.add(textPane, constraints);
			}
			if (type == USERNAME_AND_PASSWORD || type == USERNAME) {
				panel.add(getUsernameLabel(), constraints);
				JTextField usernameTextField = getUsernameTextField();
				usernameTextField.setText(defaultUsername);
				panel.add(usernameTextField, constraints);
			}
			if (type == USERNAME_AND_PASSWORD || type == PASSWORD) {
				panel.add(getPasswordLabel(), constraints);
				panel.add(getPasswordField(), constraints);
			}
			constraints.anchor = GridBagConstraints.CENTER;
			panel.add(getButtonPanel(), constraints);
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
	
	private JLabel usernameLabel;
	
	public JLabel getUsernameLabel() {
		if (usernameLabel == null) {
			usernameLabel = new JLabel(JSI18n.getText(getClass(), "Username:"));
		}
		return usernameLabel;
	}
	
	private JTextField usernameTextField;
	
	public JTextField getUsernameTextField() {
		if (usernameTextField == null) {
			usernameTextField = new JTextField(20);
		}
		return usernameTextField;
	}
	
	private JLabel passwordLabel;
	
	public JLabel getPasswordLabel() {
		if (passwordLabel == null) {
			passwordLabel = new JLabel(JSI18n.getText(getClass(), "Password:"));
		}
		return passwordLabel;
	}
	
	private JPasswordField passwordField;
	
	public JPasswordField getPasswordField() {
		if (passwordField == null) {
			passwordField = new JPasswordField(20);
		}
		return passwordField;
	}
	
	public static void main(String[] args) {
		
		JSLoginDialog loginDialog = new JSLoginDialog(null, PASSWORD, "<html><b>Sign in</b></html>", null);
		JPasswordField passwordField = loginDialog.getPasswordField();
		int option = loginDialog.showDialog();
		if (option == JOptionPane.OK_OPTION) {
			char[] password = passwordField.getPassword();
			char[] correctPassword = { 'b', 'u', 'g', 'a', 'b', 'o', 'o' };
			if (Arrays.equals(password, correctPassword)) {
				JSOptionPane.showMessageDialog((Frame) loginDialog.getOwner(), "Success! You typed the right password.", null);
			} else {
				JSOptionPane.showMessageDialog((Frame) loginDialog.getOwner(), "Invalid password. Try again.", "Error Message");
			}
			Arrays.fill(password, '0');
			Arrays.fill(correctPassword, '0');
		}
		passwordField.setText("");
	}
}
