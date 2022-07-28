package jsuis.script;

import java.awt.image.BufferedImage;
import java.util.HashMap;
import java.util.Map;

import javax.swing.JButton;
import javax.swing.JCheckBox;
import javax.swing.JComboBox;
import javax.swing.JFileChooser;
import javax.swing.JLabel;
import javax.swing.JMenu;
import javax.swing.JPanel;
import javax.swing.JProgressBar;
import javax.swing.JRadioButton;
import javax.swing.JSlider;
import javax.swing.JSplitPane;
import javax.swing.JTabbedPane;
import javax.swing.JTable;
import javax.swing.JTextArea;
import javax.swing.JTextField;
import javax.swing.JTree;

/**
 * Script component utils
 * 
 * @author Yassuo Toda
 */
public class JSScriptComponentUtils {
	
	public static Class<?> getComponent(String name) {
		return getComponentMap().get(name);
	}
	
	private static Map<String, Class<?>> componentMap;
	
	private static Map<String, Class<?>> getComponentMap() {
		if (componentMap == null) {
			componentMap = new HashMap<>();
			componentMap.put("Button", JButton.class);
			componentMap.put("Check", JCheckBox.class);
			componentMap.put("Combo", JComboBox.class);
			componentMap.put("Directory", JFileChooser.class);
			componentMap.put("Field", JTextField.class);
			componentMap.put("File", JFileChooser.class);
			componentMap.put("Image", BufferedImage.class);
			componentMap.put("Label", JLabel.class);
			componentMap.put("Menu", JMenu.class);
			componentMap.put("Panel", JPanel.class);
			componentMap.put("Password", JPanel.class);
			componentMap.put("Progress", JProgressBar.class);
			componentMap.put("Radio", JRadioButton.class);
			componentMap.put("Slider", JSlider.class);
			componentMap.put("Split", JSplitPane.class);
			componentMap.put("Tab", JTabbedPane.class);
			componentMap.put("Table", JTable.class);
			componentMap.put("Text", JTextArea.class);
			componentMap.put("Tree", JTree.class);
		}
		return componentMap;
	}
}