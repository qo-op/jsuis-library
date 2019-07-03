package jsuis.jsuislibrary;

import java.awt.CardLayout;
import java.awt.Color;

import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JMenu;
import javax.swing.JPanel;

public class Test {

	public static void main(String[] args) {
		
		JFrame frame = new JFrame();
		
		System.out.println(frame.getContentPane().getLayout());
		
		JPanel cards = new JPanel(new CardLayout());
		frame.add(cards);
		
		JPanel green = new JPanel();
		green.setBackground(Color.green);
		cards.add(green);
		
		JPanel red = new JPanel();
		red.setBackground(Color.red);
		cards.add(red);
		
		frame.pack();
		frame.setLocationRelativeTo(null);
		frame.setVisible(true);
		
		frame.invalidate();
		
		new JPanel().revalidate();
	}
}
