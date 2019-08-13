package jsuis.jsuislibrary;

import java.awt.event.ActionEvent;

import javax.swing.AbstractAction;
import javax.swing.JButton;

public class Test {

	public static void main(String[] args) {
	
		AbstractAction action = new AbstractAction() {

			public void actionPerformed(ActionEvent e) {
			}
		};
		action.setEnabled(false);
		
		JButton button = new JButton();
		button.setAction(action);
	}
}
