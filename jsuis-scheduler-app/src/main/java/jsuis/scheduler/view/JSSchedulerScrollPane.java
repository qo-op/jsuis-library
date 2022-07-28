package jsuis.scheduler.view;

import java.awt.Component;

import javax.swing.JScrollBar;
import javax.swing.JScrollPane;
import javax.swing.LookAndFeel;
import javax.swing.UIManager;
import javax.swing.UnsupportedLookAndFeelException;

/**
 * Scheduler scroll pane
 * 
 * @author Yassuo Toda
 */
public class JSSchedulerScrollPane extends JScrollPane {

	private static final long serialVersionUID = 1L;
	
	public JSSchedulerScrollPane() {
        this(null, VERTICAL_SCROLLBAR_AS_NEEDED, HORIZONTAL_SCROLLBAR_AS_NEEDED);
	}
	
    public JSSchedulerScrollPane(Component view) {
        this(view, VERTICAL_SCROLLBAR_AS_NEEDED, HORIZONTAL_SCROLLBAR_AS_NEEDED);
    }
    
	public JSSchedulerScrollPane(int vsbPolicy, int hsbPolicy) {
        this(null, vsbPolicy, hsbPolicy);
	}
	
    public JSSchedulerScrollPane(Component view, int vsbPolicy, int hsbPolicy) {
    	super(view, vsbPolicy, hsbPolicy);
		LookAndFeel lookAndFeel = UIManager.getLookAndFeel();
		try {
			UIManager.setLookAndFeel(UIManager.getSystemLookAndFeelClassName());
			JScrollPane scrollPane = new JScrollPane();
			JScrollBar verticalScrollBar = scrollPane.getVerticalScrollBar();
			getVerticalScrollBar().setUI(verticalScrollBar.getUI());
			JScrollBar horizontalScrollBar = scrollPane.getHorizontalScrollBar();
			getHorizontalScrollBar().setUI(horizontalScrollBar.getUI());
		} catch (ClassNotFoundException | InstantiationException | IllegalAccessException | UnsupportedLookAndFeelException e) {
		} finally {
			try {
				UIManager.setLookAndFeel(lookAndFeel);
			} catch (UnsupportedLookAndFeelException e) {
			}
		}
		setBorder(null);
	}
}
