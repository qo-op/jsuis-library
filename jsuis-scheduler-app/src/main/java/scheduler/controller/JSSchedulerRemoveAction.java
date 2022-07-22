package scheduler.controller;

import java.awt.event.ActionEvent;

import javax.swing.AbstractAction;
import javax.swing.Action;
import javax.swing.JTable;

import scheduler.JSScheduler;
import scheduler.view.JSSchedulerFrame;
import scheduler.view.JSSchedulerTableModel;

/**
 * Scheduler remove action
 * 
 * @author Yassuo Toda
 */
public class JSSchedulerRemoveAction extends AbstractAction {

	private static final long serialVersionUID = 1L;

	public JSSchedulerRemoveAction() {
		putValue(Action.NAME, "Remover");
	}
	
	@Override
	public void actionPerformed(ActionEvent e) {
		JSScheduler scheduler = JSScheduler.getInstance();
		JSSchedulerFrame schedulerFrame = scheduler.getSchedulerFrame();
		JTable schedulerTable = schedulerFrame.getSchedulerTable();
		int[] rows = schedulerTable.getSelectedRows();
		schedulerTable.clearSelection();
		if (rows.length > 0) {
			JSSchedulerTableModel tableModel = (JSSchedulerTableModel) schedulerTable.getModel();
			for (int i = 0; i < rows.length; i++){
				tableModel.removeRow(rows[i] - i);
			}
		}
	}
}
