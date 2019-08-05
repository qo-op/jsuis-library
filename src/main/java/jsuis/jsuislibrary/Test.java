package jsuis.jsuislibrary;

import java.io.File;
import java.io.IOException;

import javax.swing.ImageIcon;
import javax.swing.JFrame;
import javax.swing.JLabel;

public class Test {

	public static void main(String[] args) {
		
		JFrame frame = new JFrame();
		
		try {
			System.out.println(new File(".").getCanonicalPath());
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		ImageIcon image = new ImageIcon("middle.gif");
		
		JLabel label = new JLabel("Hello, World!", image, JLabel.RIGHT);
		frame.add(label);
		
		frame.pack();
		frame.setLocationRelativeTo(null);
		frame.setVisible(true);
	}
}
