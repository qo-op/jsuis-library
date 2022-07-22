package jsuis;

import java.awt.BorderLayout;
import java.awt.Container;
import java.awt.Frame;
import java.awt.GridBagConstraints;
import java.awt.GridBagLayout;
import java.awt.Insets;
import java.awt.SecondaryLoop;
import java.awt.Toolkit;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;
import java.awt.event.WindowListener;

import javax.swing.JButton;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.WindowConstants;
import javax.swing.border.EmptyBorder;

import jsuis.util.JSI18n;

/**
 * Option pane
 * 
 * @author Yassuo Toda
 */
public class JSOptionPane extends JSDialog {

	private static final long serialVersionUID = 1L;

	public static void showMessageDialog(Frame owner, String message) {
		showMessageDialog(owner, message, JSI18n.getText(JSOptionPane.class, "Message"));
	}
	
	public static void showMessageDialog(Frame owner, String message, String title) {
		JSMessageDialog messageDialog = new JSMessageDialog(owner);
		messageDialog.setTitle(title);
		messageDialog.showMessageDialog(message);
	}
	
	public JSOptionPane(Frame owner) {
		super(owner, true);
		setAlwaysOnTop(true);
		setContentPane(getContentPane());
		setDefaultCloseOperation(WindowConstants.DO_NOTHING_ON_CLOSE);
		addWindowListener(getWindowListener());
	}
	
	private JPanel contentPane;
	
	@Override
    public Container getContentPane() {
		if (contentPane == null) {
			contentPane = new JPanel(new BorderLayout());
			contentPane.setBorder(new EmptyBorder(5, 5, 5, 5));
			contentPane.add(getButtonPanel(), BorderLayout.SOUTH);
			contentPane.add(getPanel());
		}
		return contentPane;
    }
	
	private JPanel buttonPanel;
	
	public JPanel getButtonPanel() {
		if (buttonPanel == null) {
			buttonPanel = new JPanel(new GridBagLayout());
			buttonPanel.add(getOkButton());
			JButton cancelButton = getCancelButton();
			if (cancelButton != null) {
				GridBagConstraints c = new GridBagConstraints();
				c.insets = new Insets(0, 5, 0, 0);
				buttonPanel.add(cancelButton, c);
				cancelButton.addActionListener(getCancelActionListener());
			}
		}
		return buttonPanel;
	}
	
	private JButton okButton;
	
	public JButton getOkButton() {
		if (okButton == null) {
			okButton = new JButton(JSI18n.getText(getClass(), "OK"));
			okButton.addActionListener(getOkActionListener());
		}
		return okButton;
	}
	
	private ActionListener okActionListener;
	
	public ActionListener getOkActionListener() {
		if (okActionListener == null) {
			okActionListener = new ActionListener() {
				@Override
				public void actionPerformed(ActionEvent e) {
			    	setOption(JOptionPane.OK_OPTION);
	    			getSecondaryLoop().exit();
					setVisible(false);
				}
			};
		}
		return okActionListener;
	}
	
	public JButton getCancelButton() {
		return null;
	}
	
	private ActionListener cancelActionListener;
	
	public ActionListener getCancelActionListener() {
		if (cancelActionListener == null) {
			cancelActionListener = new ActionListener() {
				@Override
				public void actionPerformed(ActionEvent e) {
			    	setOption(JOptionPane.CANCEL_OPTION);
					getSecondaryLoop().exit();
					setVisible(false);
				}
			};
		}
		return cancelActionListener;
	}
	
	private JPanel panel;
	
	public JPanel getPanel() {
		if (panel == null) {
			panel = new JPanel();
		}
		return panel;
	}
	
	private WindowListener windowListener;
	
	public WindowListener getWindowListener() {
		if (windowListener == null) {
			windowListener = new WindowAdapter() {
			    public void windowClosing(WindowEvent evt) {
			    	setOption(JOptionPane.CLOSED_OPTION);
					getSecondaryLoop().exit();
					setVisible(false);
			    }
			};
		}
		return windowListener;
	}
	
	public int showDialog() {
		SecondaryLoop secondaryLoop = Toolkit.getDefaultToolkit().getSystemEventQueue().createSecondaryLoop();
		setSecondaryLoop(secondaryLoop);
		new Thread(getDialogRunnable()).start();
		secondaryLoop.enter();
		return getOption();
	}
	
	private SecondaryLoop secondaryLoop;
	
	public SecondaryLoop getSecondaryLoop() {
		return secondaryLoop;
	}
	
	public void setSecondaryLoop(SecondaryLoop secondaryLoop) {
		this.secondaryLoop = secondaryLoop;
	}
	
	private Runnable dialogRunnable;
	
	public Runnable getDialogRunnable() {
		if (dialogRunnable == null) {
			dialogRunnable = new Runnable() {
				@Override
				public void run() {
					pack();
					setLocationRelativeTo(getOwner());
					setVisible(true);
				}
			};
		}
		return dialogRunnable;
	}
	
	private int option = JOptionPane.OK_OPTION;
	
	public int getOption() {
		return option;
	}
	
	public void setOption(int option) {
		this.option = option;
	}
	
	/*
	 * Grid bag constraints
	 */
	
	private GridBagConstraints labelConstraints;
	
	public GridBagConstraints getLabelConstraints() {
		return getLabelConstraints(null);
	}
	
	public GridBagConstraints getLabelConstraints(Insets insets) {
		if (labelConstraints == null) {
			labelConstraints = new GridBagConstraints();
			labelConstraints.gridx = 0;
			labelConstraints.anchor = GridBagConstraints.LINE_END;
		}
		if (insets != null) {
			labelConstraints.insets = insets;
		}
		return labelConstraints;
	}
	
	private GridBagConstraints textFieldInputConstraints;
	
	public GridBagConstraints getTextFieldInputConstraints() {
		return getTextFieldInputConstraints(null);
	}
	
	public GridBagConstraints getTextFieldInputConstraints(Insets insets) {
		if (textFieldInputConstraints == null) {
			textFieldInputConstraints = new GridBagConstraints();
			textFieldInputConstraints.gridx = 1;
			textFieldInputConstraints.fill = GridBagConstraints.HORIZONTAL;
			textFieldInputConstraints.weightx = 1;
		}
		if (insets != null) {
			textFieldInputConstraints.insets = insets;
		}
		return textFieldInputConstraints;
	}

	private GridBagConstraints radioButtonConstraints;
	
	public GridBagConstraints getRadioButtonConstraints() {
		return getRadioButtonConstraints(null);
	}
	
	public GridBagConstraints getRadioButtonConstraints(Insets insets) {
		if (radioButtonConstraints == null) {
			radioButtonConstraints = new GridBagConstraints();
			radioButtonConstraints.gridx = 1;
			radioButtonConstraints.anchor = GridBagConstraints.LINE_START;
		}
		if (insets != null) {
			radioButtonConstraints.insets = insets;
		}
		return radioButtonConstraints;
	}
	
	private GridBagConstraints textAreaConstraints;
	
	public GridBagConstraints getTextAreaConstraints() {
		return getTextAreaConstraints(null);
	}
	
	public GridBagConstraints getTextAreaConstraints(Insets insets) {
		if (textAreaConstraints == null) {
			textAreaConstraints = new GridBagConstraints();
			textAreaConstraints.gridx = 0;
			textAreaConstraints.gridwidth = 2;
			textAreaConstraints.fill = GridBagConstraints.BOTH;
			textAreaConstraints.weightx = 1;
			textAreaConstraints.weighty = 1;
		}
		if (insets != null) {
			textAreaConstraints.insets = insets;
		}
		return textAreaConstraints;
	}
}
