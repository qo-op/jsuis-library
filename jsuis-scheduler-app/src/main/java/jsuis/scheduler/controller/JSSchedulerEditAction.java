package jsuis.scheduler.controller;

import java.awt.event.ActionEvent;

import javax.swing.AbstractAction;
import javax.swing.Action;

import jsuis.util.JSI18n;

/**
 * Scheduler edit action
 * 
 * @author Yassuo Toda
 */
public class JSSchedulerEditAction extends AbstractAction {

	private static final long serialVersionUID = 1L;
	
	public JSSchedulerEditAction() {
		putValue(Action.NAME, JSI18n.getText(getClass(), "Edit"));
	}
	
	@Override
	public void actionPerformed(ActionEvent evt) {
		new JSSchedulerEditWorker().execute();
	}
}
