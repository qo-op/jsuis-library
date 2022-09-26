package jsuis.scheduler.controller;

import java.awt.event.ActionEvent;
import java.io.File;

import javax.swing.AbstractAction;
import javax.swing.Action;
import javax.swing.JFileChooser;

import jsuis.scheduler.JSScheduler;
import jsuis.util.JSI18n;

/**
 * Scheduler save action
 * 
 * @author Yassuo Toda
 */
public class JSSchedulerSaveAction extends AbstractAction {

	private static final long serialVersionUID = 1L;
	
	public JSSchedulerSaveAction() {
		putValue(Action.NAME, JSI18n.getText(getClass(), "Save"));
	}
	
	private static final JFileChooser SCHEDULER_FILE_CHOOSER = new JFileChooser();

	@Override
	public void actionPerformed(ActionEvent evt) {
		if (SCHEDULER_FILE_CHOOSER.showSaveDialog(null) == JFileChooser.APPROVE_OPTION) {
			File file = SCHEDULER_FILE_CHOOSER.getSelectedFile();
			JSScheduler.getInstance().save(file);
		}
	}
}
