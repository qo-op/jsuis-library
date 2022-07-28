package jsuis.scheduler.controller;

import java.awt.event.ActionEvent;

import javax.swing.AbstractAction;
import javax.swing.Action;
import javax.swing.JTable;

import jsuis.scheduler.JSScheduler;
import jsuis.scheduler.view.JSSchedulerFrame;
import jsuis.scheduler.view.JSSchedulerTableModel;

/**
 * Scheduler add action
 * 
 * @author Yassuo Toda
 */
public class JSSchedulerAddAction extends AbstractAction {

	private static final long serialVersionUID = 1L;

	public JSSchedulerAddAction() {
		putValue(Action.NAME, "Add");
	}
	
	@Override
	public void actionPerformed(ActionEvent e) {
		JSScheduler scheduler = JSScheduler.getInstance();
		JSSchedulerFrame schedulerFrame = scheduler.getSchedulerFrame();
		JTable schedulerTable = schedulerFrame.getSchedulerTable();
		int[] rows = schedulerTable.getSelectedRows();
		schedulerTable.clearSelection();
		JSSchedulerTableModel tableModel = (JSSchedulerTableModel) schedulerTable.getModel();
		Object[] rowData = new Object[] { "" };
		int rowCount = schedulerTable.getRowCount();
		int row;
		if (rows.length > 0 && (row = rows[rows.length - 1] + 1) < rowCount) {
			tableModel.insertRow(row, rowData);
		} else {
			row = rowCount;
			tableModel.addRow(rowData);
		}
		schedulerTable.addRowSelectionInterval(row, row);
	}
}
