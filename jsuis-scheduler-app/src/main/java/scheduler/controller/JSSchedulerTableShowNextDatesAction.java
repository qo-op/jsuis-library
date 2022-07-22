package scheduler.controller;

import java.awt.event.ActionEvent;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Set;

import javax.swing.AbstractAction;
import javax.swing.Action;
import javax.swing.JOptionPane;
import javax.swing.JTable;
import javax.swing.table.TableModel;

import jsuis.cron.visitor.JSCronDateCalculator;
import scheduler.JSScheduler;
import scheduler.view.JSSchedulerFrame;

/**
 * Show next dates action
 * 
 * @author Yassuo Toda
 */
public class JSSchedulerTableShowNextDatesAction extends AbstractAction {

	private static final long serialVersionUID = 1L;

	public JSSchedulerTableShowNextDatesAction() {
		putValue(Action.NAME, "Mostrar próximas datas");
	}
	
	private static final SimpleDateFormat ddMMyyyyHHmm = new SimpleDateFormat("dd/MM/yyyy HH:mm");
	
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
		long offset = JSCronDateCalculator.getInstance().getOffset();
		long millis = System.currentTimeMillis();
		millis -= offset;
		millis /= 60_000;
		int minute = (int) (millis % 60);
		millis /= 60;
		int hour = (int) (millis % 24);
		millis -= hour;
		millis *= 3_600_000;
		millis += offset;
		int size = 3;
		List<Long>dateList = scheduler.getDateList(source, line, millis, size, null);
		Set<Integer> minuteSet = scheduler.getMinuteSet(source, line, null);
		Set<Integer> hourSet = scheduler.getHourSet(source, line, null);
		List<String> dateTimeList = new ArrayList<>();
		int count = 0;
		for (long date : dateList) {
			if (count >= size) {
				break;
			}
			if (date == millis) {
				for (int h : hourSet) {
					if (count >= size) {
						break;
					}
					if (h < hour) {
						continue;
					}
					if (h == hour) {
						for (int m : minuteSet) {
							if (m <= minute) {
								continue;
							}
							if (count++ < size) {
								dateTimeList.add(toString(date, h, m));
							} else {
								break;
							}
						}
					} else {
						for (int m : minuteSet) {
							if (count++ < size) {
								dateTimeList.add(toString(date, h, m));
							} else {
								break;
							}
						}
					}
				}
			} else {
				for (int h : hourSet) {
					if (count >= size) {
						break;
					}
					for (int m : minuteSet) {
						if (count++ < size) {
							dateTimeList.add(toString(date, h, m));
						} else {
							break;
						}
					}
				}
			}
		}
		System.out.println(dateTimeList);
		JOptionPane.showMessageDialog(scheduler.getSchedulerFrame(), String.join(", ", dateTimeList));
	}
	
	public String toString(long date, int hour, int minute) {
		if (date == 0) {
			return "";
		}
		Calendar calendar = Calendar.getInstance();
		calendar.setTimeInMillis(date + hour * 3_600_000 + minute * 60_000);
		return ddMMyyyyHHmm.format(calendar.getTime());
	}
}
