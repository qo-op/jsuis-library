package jsuis.gui;

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

import jsuis.util.JSI18n;

/**
 * Option pane
 * 
 * @author Yassuo Toda
 */
public class JSOptionPane extends JSDialog {

	private static final long serialVersionUID = 1L;
	
	public static void showMessageDialog(Frame owner, String message, String title) {
		new JSMessageDialog(owner, message, title).showDialog();
	}
	
	public JSOptionPane(Frame owner) {
		super(owner, true);
		setAlwaysOnTop(true);
		setDefaultCloseOperation(WindowConstants.DO_NOTHING_ON_CLOSE);
		addWindowListener(getWindowListener());
	}
	
	private JPanel buttonPanel;
	
	public JPanel getButtonPanel() {
		if (buttonPanel == null) {
			buttonPanel = new JPanel(new GridBagLayout());
			buttonPanel.add(getOkButton());
			JButton cancelButton = getCancelButton();
			if (cancelButton != null) {
				GridBagConstraints c = new GridBagConstraints();
				c.insets = new Insets(0, 4, 0, 0);
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
		int option = getOption();
		dispose();
		return option;
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
}
