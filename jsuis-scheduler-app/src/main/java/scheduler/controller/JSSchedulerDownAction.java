package scheduler.controller;

import java.awt.event.ActionEvent;

import javax.swing.AbstractAction;
import javax.swing.Action;
import javax.swing.JTable;

import scheduler.JSScheduler;
import scheduler.view.JSSchedulerFrame;
import scheduler.view.JSSchedulerTableModel;

/**
 * Scheduler down action
 * 
 * @author Yassuo Toda
 */
public class JSSchedulerDownAction extends AbstractAction {

	private static final long serialVersionUID = 1L;

	public JSSchedulerDownAction() {
		putValue(Action.NAME, "Para baixo");
	}
	
	@Override
	public void actionPerformed(ActionEvent e) {
		JSScheduler scheduler = JSScheduler.getInstance();
		JSSchedulerFrame schedulerFrame = scheduler.getSchedulerFrame();
		JTable schedulerTable = schedulerFrame.getSchedulerTable();
		int[] rows = schedulerTable.getSelectedRows();
		schedulerTable.clearSelection();
		if (rows.length > 0) {
			int rowCount = schedulerTable.getRowCount();
			JSSchedulerTableModel tableModel = (JSSchedulerTableModel) schedulerTable.getModel();
			if (rows[rows.length - 1] < rowCount - 1) {
				for (int i = rows.length - 1; i >= 0; i--){
					int row = rows[i] + 1;
					tableModel.swap(rows[i], row);
					schedulerTable.addRowSelectionInterval(row, row);
				}
			}
		}
	}
}
