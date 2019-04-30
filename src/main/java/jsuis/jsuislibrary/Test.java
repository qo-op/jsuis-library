package jsuis.jsuislibrary;

import java.awt.CardLayout;
import java.awt.Dimension;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;

import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JTree;

public class Test {

	public static void main(String[] args) {
		
		JFrame frame = new JFrame();
		
		JPanel panel = new JPanel(new CardLayout());
		frame.setContentPane(panel);
		
		JLabel label = new JLabel("Hello World!");
		panel.add(label);
		
		JLabel label2 = new JLabel("Hello World2!");
		panel.add(label2);
		
		JTree tree = new JTree();
		panel.add(tree);
		
		System.out.println(tree.isRootVisible());
		
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		frame.setPreferredSize(new Dimension(800, 600));
		frame.pack();
		
		frame.addWindowListener(new WindowAdapter() {

			@Override
			public void windowOpened(WindowEvent windowEvent) {
				System.out.println("windowOpened");
				
			}
		});
		
		frame.setVisible(true);
	}
}
