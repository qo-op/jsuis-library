package jsuis.gui;

import javax.swing.SwingWorker;

/**
 * Worker
 * 
 * @author Yassuo Toda
 */
public abstract class JSWorker<T, V> extends SwingWorker<T, V> {

	@Override
	public void done() {
		try {
			if (!isCancelled()) {
				get();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
