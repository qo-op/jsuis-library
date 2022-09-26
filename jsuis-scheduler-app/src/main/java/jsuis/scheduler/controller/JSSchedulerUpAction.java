package jsuis.scheduler.controller;

import java.awt.event.ActionEvent;

import javax.swing.AbstractAction;
import javax.swing.Action;
import javax.swing.JTable;

import jsuis.scheduler.JSScheduler;
import jsuis.scheduler.view.JSSchedulerFrame;
import jsuis.scheduler.view.JSSchedulerTableModel;
import jsuis.util.JSI18n;

/**
 * Scheduler up action
 * 
 * @author Yassuo Toda
 */
public class JSSchedulerUpAction extends AbstractAction {

	private static final long serialVersionUID = 1L;

	public JSSchedulerUpAction() {
		putValue(Action.NAME, JSI18n.getText(getClass(), "Up"));
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
			if (rows[0] > 0) {
				for (int i = 0; i < rows.length; i++){
					int row = rows[i] - 1;
					tableModel.swap(rows[i], row);
					schedulerTable.addRowSelectionInterval(row, row);
				}
			}
		}
	}
}
