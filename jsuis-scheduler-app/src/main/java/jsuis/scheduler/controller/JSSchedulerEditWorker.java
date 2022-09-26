package jsuis.scheduler.controller;

import java.util.List;

import javax.swing.JOptionPane;
import javax.swing.JTable;
import javax.swing.table.TableModel;

import jsuis.cron.parser.JSCronParser;
import jsuis.cron.scanner.JSCronScanner;
import jsuis.cron.visitor.JSCronDateCalculator;
import jsuis.cron.visitor.JSCronPrinter;
import jsuis.cron.visitor.JSCronSplitter;
import jsuis.gui.JSWorker;
import jsuis.interpreter.parser.statement.JSStatement;
import jsuis.interpreter.scanner.JSToken;
import jsuis.scheduler.JSScheduler;
import jsuis.scheduler.view.JSSchedulerFrame;
import jsuis.scheduler.view.JSSchedulerInputDialog;

/**
 * Scheduler edit action
 * 
 * @author Yassuo Toda
 */
public class JSSchedulerEditWorker extends JSWorker<Void, Void> {

	@Override
	protected Void doInBackground() throws Exception {
		JSScheduler scheduler = JSScheduler.getInstance();
		JSSchedulerFrame schedulerFrame = scheduler.getSchedulerFrame();
		JTable schedulerTable = schedulerFrame.getSchedulerTable();
		int[] rows = schedulerTable.getSelectedRows();
		if (rows.length == 0) {
			return null;
		}
		TableModel schedulerTableModel = schedulerFrame.getSchedulerTableModel();
		int row = rows[0];
		String source = (String) schedulerTableModel.getValueAt(row, 0);
		if (source == null) {
			return null;
		}
		int line = row + 1;
		JSCronScanner cronScanner = new JSCronScanner(source, line);
		List<JSToken> cronTokenList = cronScanner.scan();
		JSCronParser cronParser = new JSCronParser(cronTokenList);
		List<JSStatement> cronStatementList = cronParser.parse();
		JSCronSplitter cronSplitter = new JSCronSplitter(new JSCronPrinter());
		List<String> fieldList = cronSplitter.split(cronStatementList);
		List<String> commandList = scheduler.getCommandList(source, line, cronStatementList);
		JSSchedulerInputDialog editDialog = scheduler.getSchedulerEditDialog();
		editDialog.clear();
		if (fieldList.size() == 2) {
			String macro = fieldList.get(0);
			if ("@reboot".equals(macro)) {
				editDialog.getRebootRadioButton().setSelected(true);
			} else if ("@yearly".equals(macro) || "@annually".equals(macro)) {
				editDialog.getYearlyRadioButton().setSelected(true);
			} else if ("@monthly".equals(macro)) {
				editDialog.getMonthlyRadioButton().setSelected(true);
			} else if ("@weekly".equals(macro)) {
				editDialog.getWeeklyRadioButton().setSelected(true);
			} else if ("@daily".equals(macro) || "@midnight".equals(macro)) {
				editDialog.getDailyRadioButton().setSelected(true);
			} else if ("@hourly".equals(macro)) {
				editDialog.getHourlyRadioButton().setSelected(true);
			}
		} else if (fieldList.size() >= 6) {
			editDialog.getCustomizeRadioButton().setSelected(true);
			editDialog.getMinuteTextField().setText(fieldList.get(0));
			editDialog.getHourTextField().setText(fieldList.get(1));
			editDialog.getDayOfMonthTextField().setText(fieldList.get(2));
			editDialog.getMonthTextField().setText(fieldList.get(3));
			editDialog.getDayOfWeekTextField().setText(fieldList.get(4));
			if (fieldList.size() > 6) {
				editDialog.getYearTextField().setText(fieldList.get(5));
			}
		}
		String command = String.join("\n", commandList);
		editDialog.getCommandTextArea().setText(command);
		
		if (editDialog.showDialog() == JOptionPane.OK_OPTION) {
			
			source = editDialog.getSource();
			long offset = JSCronDateCalculator.getInstance().getOffset();
			long start = System.currentTimeMillis();
			start = (start  - offset) / 86_400_000 * 86_400_000 + offset; 
			scheduler.compute(source, line, start, 3);
			schedulerTableModel.setValueAt(source, row, 0);
		}
		return null;
	}
}
