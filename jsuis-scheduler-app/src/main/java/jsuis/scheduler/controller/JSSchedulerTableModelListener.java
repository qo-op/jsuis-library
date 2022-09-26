package jsuis.scheduler.controller;

import javax.swing.event.TableModelEvent;
import javax.swing.event.TableModelListener;

import jsuis.scheduler.JSScheduler;

/**
 * Scheduler table model listener
 * 
 * @author Yassuo Toda
 */
public class JSSchedulerTableModelListener implements TableModelListener {

	@Override
	public void tableChanged(TableModelEvent evt) {
		JSScheduler scheduler = JSScheduler.getInstance();
		if (evt.getType() == TableModelEvent.UPDATE) {
			int firstRow = evt.getFirstRow();
			int lastRow = evt.getLastRow();
			scheduler.updateRows(firstRow, lastRow);
		}
		scheduler.save();
	}
}
