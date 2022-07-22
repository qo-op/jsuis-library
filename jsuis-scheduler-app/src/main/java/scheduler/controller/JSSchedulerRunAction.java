package scheduler.controller;

import java.awt.event.ActionEvent;
import java.util.ArrayList;
import java.util.List;

import javax.swing.AbstractAction;
import javax.swing.Action;
import javax.swing.JTable;
import javax.swing.table.TableModel;

import scheduler.JSScheduler;
import scheduler.view.JSSchedulerFrame;

/**
 * Scheduler run action
 * 
 * @author Yassuo Toda
 */
public class JSSchedulerRunAction extends AbstractAction {

	private static final long serialVersionUID = 1L;
	
	public JSSchedulerRunAction() {
		putValue(Action.NAME, "Rodar");
	}
	
	@Override
	public void actionPerformed(ActionEvent evt) {
		JSScheduler scheduler = JSScheduler.getInstance();
		JSSchedulerFrame schedulerFrame = scheduler.getSchedulerFrame();
		JTable schedulerTable = schedulerFrame.getSchedulerTable();
		int[] rows = schedulerTable.getSelectedRows();
		if (rows.length == 0) {
			return;
		}
		TableModel schedulerTableModel = schedulerFrame.getSchedulerTableModel();
		int row = rows[0];
		String source = (String) schedulerTableModel.getValueAt(row, 0);
		if (source == null) {
			return;
		}
		int line = row + 1;
		List<String> commandList = scheduler.getCommandList(source, line, null);
		scheduler.runCommand(new ArrayList<>(commandList), line);
	}
}
