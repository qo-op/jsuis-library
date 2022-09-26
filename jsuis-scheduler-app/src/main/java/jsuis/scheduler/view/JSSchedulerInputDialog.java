package jsuis.scheduler.view;

import java.awt.Frame;
import java.awt.GridBagConstraints;
import java.awt.GridBagLayout;
import java.awt.Insets;
import java.awt.event.ActionEvent;
import java.util.ArrayList;
import java.util.List;

import javax.swing.AbstractAction;
import javax.swing.Action;
import javax.swing.ButtonGroup;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JRadioButton;
import javax.swing.JScrollPane;
import javax.swing.JTextArea;
import javax.swing.JTextField;
import javax.swing.border.EmptyBorder;

import jsuis.gui.JSInputDialog;
import jsuis.util.JSI18n;

/**
 * Scheduler Input Dialog
 * 
 * @author Yassuo Toda
 */
public class JSSchedulerInputDialog extends JSInputDialog {

	private static final long serialVersionUID = 1L;

	public JSSchedulerInputDialog(Frame owner) {
		super(owner);
		setTitle(JSI18n.getText(getClass(), "Edit"));
		add(getPanel());
	}
	
	private JPanel panel;
	
	public JPanel getPanel() {
		if (panel == null) {
			panel = new JPanel(new GridBagLayout());
			panel.setBorder(new EmptyBorder(4, 4, 4, 4));
			
			GridBagConstraints labelConstraints = new GridBagConstraints();
			labelConstraints.anchor = GridBagConstraints.LINE_END;
			labelConstraints.gridx = 0;
			labelConstraints.insets = new Insets(0, 0, 2, 4);
			
			GridBagConstraints radioButtonConstraints = new GridBagConstraints();
			radioButtonConstraints.anchor = GridBagConstraints.LINE_START;
			radioButtonConstraints.gridx = 1;
			radioButtonConstraints.insets = new Insets(0, 0, 2, 0);
			
			GridBagConstraints textFieldInputConstraints = new GridBagConstraints();
			textFieldInputConstraints.fill = GridBagConstraints.HORIZONTAL;
			textFieldInputConstraints.gridx = 1;
			textFieldInputConstraints.insets = new Insets(0, 0, 2, 0);
			textFieldInputConstraints.weightx = 1;
			
			GridBagConstraints textAreaConstraints = new GridBagConstraints();
			textAreaConstraints.fill = GridBagConstraints.BOTH;
			textAreaConstraints.gridx = 0;
			textAreaConstraints.gridwidth = 2;
			textAreaConstraints.insets = new Insets(0, 0, 2, 0);
			textAreaConstraints.weightx = 1;
			textAreaConstraints.weighty = 1;
			
			GridBagConstraints buttonPanelConstraints = new GridBagConstraints();
			buttonPanelConstraints.gridx = 0;
			buttonPanelConstraints.gridwidth = 2;
			
			panel.add(getRebootLabel(), labelConstraints);
			panel.add(getRebootRadioButton(), radioButtonConstraints);
			panel.add(getYearlyLabel(), labelConstraints);
			panel.add(getYearlyRadioButton(), radioButtonConstraints);
			panel.add(getMonthlyLabel(), labelConstraints);
			panel.add(getMonthlyRadioButton(), radioButtonConstraints);
			panel.add(getWeeklyLabel(), labelConstraints);
			panel.add(getWeeklyRadioButton(), radioButtonConstraints);
			panel.add(getDailyLabel(), labelConstraints);
			panel.add(getDailyRadioButton(), radioButtonConstraints);
			panel.add(getHourlyLabel(), labelConstraints);
			panel.add(getHourlyRadioButton(), radioButtonConstraints);
			panel.add(getCustomizeLabel(), labelConstraints);
			panel.add(getCustomizeRadioButton(), radioButtonConstraints);
			panel.add(getMinuteLabel(), labelConstraints);
			panel.add(getMinuteTextField(), textFieldInputConstraints);
			panel.add(getHourLabel(), labelConstraints);
			panel.add(getHourTextField(), textFieldInputConstraints);
			panel.add(getDayOfMonthLabel(), labelConstraints);
			panel.add(getDayOfMonthTextField(), textFieldInputConstraints);
			panel.add(getMonthLabel(), labelConstraints);
			panel.add(getMonthTextField(), textFieldInputConstraints);
			panel.add(getDayOfWeekLabel(), labelConstraints);
			panel.add(getDayOfWeekTextField(), textFieldInputConstraints);
			panel.add(getYearLabel(), labelConstraints);
			panel.add(getYearTextField(), textFieldInputConstraints);
			panel.add(getCommandLabel(), labelConstraints);
			panel.add(new JScrollPane(getCommandTextArea()), textAreaConstraints);
			panel.add(getButtonPanel(), buttonPanelConstraints);
		}
		return panel;
	}
	
	public void clear() {
		getCustomizeRadioButton().setSelected(true);
		getMinuteTextField().setText("");
		getHourTextField().setText("");
		getDayOfMonthTextField().setText("");
		getMonthTextField().setText("");
		getDayOfWeekTextField().setText("");
		getYearTextField().setText("");
		getCommandTextArea().setText("");;
	}
	
	private JLabel rebootLabel;
	
	public JLabel getRebootLabel() {
		if (rebootLabel == null) {
			rebootLabel = createLabel("At reboot?");
		}
		return rebootLabel;
	}
	
	private JRadioButton rebootRadioButton;
	
	public JRadioButton getRebootRadioButton() {
		if (rebootRadioButton == null) {
			rebootRadioButton = new JRadioButton(getRadioAction());
			getButtonGroup().add(rebootRadioButton);
		}
		return rebootRadioButton;
	}
	
	private JLabel yearlyLabel;
	
	public JLabel getYearlyLabel() {
		if (yearlyLabel == null) {
			yearlyLabel = createLabel("Yearly?");
		}
		return yearlyLabel;
	}
	
	private JRadioButton yearlyRadioButton;
	
	public JRadioButton getYearlyRadioButton() {
		if (yearlyRadioButton == null) {
			yearlyRadioButton = new JRadioButton(getRadioAction());
			getButtonGroup().add(yearlyRadioButton);
		}
		return yearlyRadioButton;
	}
	
	private JLabel monthlyLabel;
	
	public JLabel getMonthlyLabel() {
		if (monthlyLabel == null) {
			monthlyLabel = createLabel("Monthly?");
		}
		return monthlyLabel;
	}
	
	private JRadioButton monthlyRadioButton;
	
	public JRadioButton getMonthlyRadioButton() {
		if (monthlyRadioButton == null) {
			monthlyRadioButton = new JRadioButton(getRadioAction());
			getButtonGroup().add(monthlyRadioButton);
		}
		return monthlyRadioButton;
	}
	
	private JLabel weeklyLabel;
	
	public JLabel getWeeklyLabel() {
		if (weeklyLabel == null) {
			weeklyLabel = createLabel("Weekly?");
		}
		return weeklyLabel;
	}
	
	private JRadioButton weeklyRadioButton;
	
	public JRadioButton getWeeklyRadioButton() {
		if (weeklyRadioButton == null) {
			weeklyRadioButton = new JRadioButton(getRadioAction());
			getButtonGroup().add(weeklyRadioButton);
		}
		return weeklyRadioButton;
	}
	
	private JLabel dailyLabel;
	
	public JLabel getDailyLabel() {
		if (dailyLabel == null) {
			dailyLabel = createLabel("Daily?");
		}
		return dailyLabel;
	}
	
	private JRadioButton dailyRadioButton;
	
	public JRadioButton getDailyRadioButton() {
		if (dailyRadioButton == null) {
			dailyRadioButton = new JRadioButton(getRadioAction());
			getButtonGroup().add(dailyRadioButton);
		}
		return dailyRadioButton;
	}
	
	private JLabel hourlyLabel;
	
	public JLabel getHourlyLabel() {
		if (hourlyLabel == null) {
			hourlyLabel = createLabel("Hourly?");
		}
		return hourlyLabel;
	}
	
	private JRadioButton hourlyRadioButton;
	
	public JRadioButton getHourlyRadioButton() {
		if (hourlyRadioButton == null) {
			hourlyRadioButton = new JRadioButton(getRadioAction());
			getButtonGroup().add(hourlyRadioButton);
		}
		return hourlyRadioButton;
	}
	
	private JLabel customizeLabel;
	
	public JLabel getCustomizeLabel() {
		if (customizeLabel == null) {
			customizeLabel = createLabel("Customize?");
		}
		return customizeLabel;
	}
	
	private JRadioButton customizeRadioButton;
	
	public JRadioButton getCustomizeRadioButton() {
		if (customizeRadioButton == null) {
			customizeRadioButton = new JRadioButton(getRadioAction());
			customizeRadioButton.setSelected(true);
			getButtonGroup().add(customizeRadioButton);
		}
		return customizeRadioButton;
	}
	
	private Action radioAction;
	
	public Action getRadioAction() {
		if (radioAction == null) {
			radioAction = new AbstractAction() {
				private static final long serialVersionUID = 1L;
				@Override
				public void actionPerformed(ActionEvent evt) {
					JRadioButton radioButton = (JRadioButton) evt.getSource();
					JTextField minuteTextField = getMinuteTextField();
					JTextField hourTextField = getHourTextField();
					JTextField dayOfMonthTextField = getDayOfMonthTextField();
					JTextField monthTextField = getMonthTextField();
					JTextField dayOfWeekTextField = getDayOfWeekTextField();
					JTextField yearTextField = getYearTextField();
					if (radioButton == getRebootRadioButton()) {
						minuteTextField.setText("");
						hourTextField.setText("");
						dayOfMonthTextField.setText("");
						monthTextField.setText("");
						dayOfWeekTextField.setText("");
						yearTextField.setText("");
					} else if (radioButton == getYearlyRadioButton()) {
						minuteTextField.setText("0");
						hourTextField.setText("0");
						dayOfMonthTextField.setText("1");
						monthTextField.setText("1");
						dayOfWeekTextField.setText("*");
						yearTextField.setText("");
					} else if (radioButton == getMonthlyRadioButton()) {
						minuteTextField.setText("0");
						hourTextField.setText("0");
						dayOfMonthTextField.setText("1");
						monthTextField.setText("*");
						dayOfWeekTextField.setText("*");
						yearTextField.setText("");
					} else if (radioButton == getWeeklyRadioButton()) {
						minuteTextField.setText("0");
						hourTextField.setText("0");
						dayOfMonthTextField.setText("*");
						monthTextField.setText("*");
						dayOfWeekTextField.setText("0");
						yearTextField.setText("");
					} else if (radioButton == getDailyRadioButton()) {
						minuteTextField.setText("0");
						hourTextField.setText("0");
						dayOfMonthTextField.setText("*");
						monthTextField.setText("*");
						dayOfWeekTextField.setText("*");
						yearTextField.setText("");
					} else if (radioButton == getHourlyRadioButton()) {
						minuteTextField.setText("0");
						hourTextField.setText("*");
						dayOfMonthTextField.setText("*");
						monthTextField.setText("*");
						dayOfWeekTextField.setText("*");
						yearTextField.setText("");
					}
					boolean selected = customizeRadioButton.isSelected();
					minuteTextField.setEnabled(selected);
					hourTextField.setEnabled(selected);
					dayOfMonthTextField.setEnabled(selected);
					monthTextField.setEnabled(selected);
					dayOfWeekTextField.setEnabled(selected);
					yearTextField.setEnabled(selected);
				}
			};
		}
		return radioAction;
	}
	
	private ButtonGroup buttonGroup;
	
	public ButtonGroup getButtonGroup() {
		if (buttonGroup == null) {
			buttonGroup = new ButtonGroup();
		}
		return buttonGroup;
	}
	
	private JLabel minuteLabel;
	
	public JLabel getMinuteLabel() {
		if (minuteLabel == null) {
			minuteLabel = createLabel("Minute (0-59|*):");
		}
		return minuteLabel;
	}
	
	private JTextField minuteTextField;
	
	public JTextField getMinuteTextField() {
		if (minuteTextField == null) {
			minuteTextField = new JTextField(20);
		}
		return minuteTextField;
	}
	
	private JLabel hourLabel;
	
	public JLabel getHourLabel() {
		if (hourLabel == null) {
			hourLabel = createLabel("Hour (0-59|*):");
		}
		return hourLabel;
	}
	
	private JTextField hourTextField;
	
	public JTextField getHourTextField() {
		if (hourTextField == null) {
			hourTextField = new JTextField(20);
		}
		return hourTextField;
	}
	
	private JLabel dayOfMonthLabel;
	
	public JLabel getDayOfMonthLabel() {
		if (dayOfMonthLabel == null) {
			dayOfMonthLabel = createLabel("Day of month (1-31|*):");
		}
		return dayOfMonthLabel;
	}
	
	private JTextField dayOfMonthTextField;
	
	public JTextField getDayOfMonthTextField() {
		if (dayOfMonthTextField == null) {
			dayOfMonthTextField = new JTextField(20);
		}
		return dayOfMonthTextField;
	}
	
	private JLabel monthLabel;
	
	public JLabel getMonthLabel() {
		if (monthLabel == null) {
			monthLabel = createLabel("Month (1-12|*):");
		}
		return monthLabel;
	}
	
	private JTextField monthTextField;
	
	public JTextField getMonthTextField() {
		if (monthTextField == null) {
			monthTextField = new JTextField(20);
		}
		return monthTextField;
	}
	
	private JLabel dayOfWeekLabel;
	
	public JLabel getDayOfWeekLabel() {
		if (dayOfWeekLabel == null) {
			dayOfWeekLabel = createLabel("Day of week (0-6|*):");
		}
		return dayOfWeekLabel;
	}
	
	private JTextField dayOfWeekTextField;
	
	public JTextField getDayOfWeekTextField() {
		if (dayOfWeekTextField == null) {
			dayOfWeekTextField = new JTextField(20);
		}
		return dayOfWeekTextField;
	}
	
	private JLabel yearLabel;
	
	public JLabel getYearLabel() {
		if (yearLabel == null) {
			yearLabel = createLabel("Year (optional):");
		}
		return yearLabel;
	}
	
	private JTextField yearTextField;
	
	public JTextField getYearTextField() {
		if (yearTextField == null) {
			yearTextField = new JTextField(20);
		}
		return yearTextField;
	}
	
	public String getSource() {
		String schedule = getSchedule();
		if (schedule.isEmpty()) {
			return getCommand();
		}
		return getSchedule() + " " + getCommand();
	}
	
	public String getSchedule() {
		List<String> fieldList = new ArrayList<>();
		if (getRebootRadioButton().isSelected()) {
			fieldList.add("@reboot");
		} else if (getYearlyRadioButton().isSelected()) {
			fieldList.add("@yearly");
		} else if (getMonthlyRadioButton().isSelected()) {
			fieldList.add("@monthly");
		} else if (getWeeklyRadioButton().isSelected()) {
			fieldList.add("@weekly");
		} else if (getDailyRadioButton().isSelected()) {
			fieldList.add("@daily");
		} else if (getHourlyRadioButton().isSelected()) {
			fieldList.add("@hourly");
		} else if (getCustomizeRadioButton().isSelected()) {
			String minute = getMinuteTextField().getText().trim();
			if (!minute.isEmpty()) {
				fieldList.add(minute);
			}
			String hour = getHourTextField().getText().trim();
			if (!hour.isEmpty()) {
				fieldList.add(hour);
			}
			String dayOfMonth = getDayOfMonthTextField().getText().trim();
			if (!dayOfMonth.isEmpty()) {
				fieldList.add(dayOfMonth);
			}
			String month = getMonthTextField().getText().trim();
			if (!month.isEmpty()) {
				fieldList.add(month);
			}
			String dayOfWeek = getDayOfWeekTextField().getText().trim();
			if (!dayOfWeek.isEmpty()) {
				fieldList.add(dayOfWeek);
			}
			String year = getYearTextField().getText().trim();
			if (!year.isEmpty()) {
				fieldList.add(year);
			}
			if (fieldList.size() < 5) {
				fieldList.clear();
			}
		}
		if (fieldList.isEmpty()) {
			return "";
		}
		return "    " + String.join(" ", fieldList.toArray(new String[fieldList.size()]));
	}
	
	public String getCommand() {
		List<String> commandList = new ArrayList<>();
		String[] lines = getCommandTextArea().getText().split("\r?\n", -1);
		for (String line : lines) {
			line = line.trim();
			if (line.isEmpty()) {
				continue;
			}
			if (line.contains(" ") && !line.startsWith("#")) {
				line = "\"" + line.replace("\"", "\"\"") + "\"";
			}
			commandList.add(line);
		}
		return String.join(" ", commandList.toArray(new String[commandList.size()]));
	}
	
	private JLabel commandLabel;
	
	public JLabel getCommandLabel() {
		if (commandLabel == null) {
			commandLabel = createLabel("Command (one line per argument):");
		}
		return commandLabel;
	}
	
	public JTextArea commandTextArea;
	
	public JTextArea getCommandTextArea() {
		if (commandTextArea == null) {
			commandTextArea = new JTextArea(10, 20);
		}
		return commandTextArea;
	}
	
	public static void main(String[] args) {
		
		JSSchedulerInputDialog inputDialog = new JSSchedulerInputDialog(null);
		int option = inputDialog.showDialog();
		System.out.println("option: " + option);
		inputDialog.dispose();
	}
}
