package jsuis.scheduler.view;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Component;
import java.awt.Dimension;
import java.awt.GridBagConstraints;
import java.awt.GridBagLayout;
import java.awt.Insets;
import java.awt.SecondaryLoop;
import java.awt.Toolkit;
import java.io.File;
import java.net.URISyntaxException;
import java.util.LinkedHashMap;
import java.util.Map;

import javax.swing.Action;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JMenuItem;
import javax.swing.JPanel;
import javax.swing.JPopupMenu;
import javax.swing.JScrollPane;
import javax.swing.JTable;
import javax.swing.JTextField;
import javax.swing.SwingConstants;
import javax.swing.event.TableModelListener;
import javax.swing.table.JTableHeader;
import javax.swing.table.TableCellRenderer;
import javax.swing.table.TableColumn;
import javax.swing.table.TableColumnModel;
import javax.swing.table.TableModel;

import jsuis.scheduler.JSScheduler;
import jsuis.scheduler.controller.JSSchedulerAddAction;
import jsuis.scheduler.controller.JSSchedulerDirectoryAction;
import jsuis.scheduler.controller.JSSchedulerDownAction;
import jsuis.scheduler.controller.JSSchedulerEditAction;
import jsuis.scheduler.controller.JSSchedulerRemoveAction;
import jsuis.scheduler.controller.JSSchedulerRunAction;
import jsuis.scheduler.controller.JSSchedulerSaveAction;
import jsuis.scheduler.controller.JSSchedulerTableModelListener;
import jsuis.scheduler.controller.JSSchedulerTableShowNextDatesAction;
import jsuis.scheduler.controller.JSSchedulerUpAction;
import jsuis.util.JSI18n;

/**
 * @author Yassuo Toda
 */
public class JSSchedulerFrame extends JFrame {

	private static final long serialVersionUID = 1L;

	public JSSchedulerFrame() {
		setTitle(JSI18n.getText(getClass(), "e-Scheduler"));
		setIconImage(JSI18n.getImage(JSScheduler.class, JSScheduler.class.getSimpleName() + ".png"));
		setPreferredSize(new Dimension(1024, 768));
		add(getSchedulerPanel());
	}
	
	private JPanel schedulerPanel;
	
	public JPanel getSchedulerPanel() {
		if (schedulerPanel == null) {
			schedulerPanel = new JPanel();
			schedulerPanel.setLayout(new BorderLayout());
			schedulerPanel.add(getSchedulerButtonPanel(), BorderLayout.EAST);
			schedulerPanel.add(getSchedulerScrollPane());
		}
		return schedulerPanel;
	}
	
	private JPanel schedulerButtonPanel;
	
	public JPanel getSchedulerButtonPanel() {
		if (schedulerButtonPanel == null) {
			schedulerButtonPanel = new JPanel();
			schedulerButtonPanel.setLayout(new GridBagLayout());
			GridBagConstraints c = new GridBagConstraints();
			c.gridx = 0;
			c.weightx = 1.0;
			c.fill = GridBagConstraints.HORIZONTAL;
			schedulerButtonPanel.add(getSchedulerAddButton(), c);
			c.insets = getPadInsets();
			schedulerButtonPanel.add(getSchedulerEditButton(), c);
			c.insets = getPadInsets();
			schedulerButtonPanel.add(getSchedulerRemoveButton(), c);
			c.insets = getSeparatorInsets();
			schedulerButtonPanel.add(getSchedulerUpButton(), c);
			c.insets = getPadInsets();
			schedulerButtonPanel.add(getSchedulerDownButton(), c);
			c.insets = getSeparatorInsets();
			schedulerButtonPanel.add(getSchedulerDirectoryButton(), c);
			c.insets = getPadInsets();
			schedulerButtonPanel.add(getSchedulerRunButton(), c);
			c.insets = getSeparatorInsets();
			schedulerButtonPanel.add(getSchedulerSaveButton(), c);
			c.weighty = 1.0;
			schedulerButtonPanel.add(new JPanel(), c);
		}
		return schedulerButtonPanel;
	}
	
	private Insets padInsets;
	
	public Insets getPadInsets() {
		if (padInsets == null) {
			padInsets = new Insets(2, 0, 0, 0);
		}
		return padInsets;
	}
	
	private Insets separatorInsets;
	
	public Insets getSeparatorInsets() {
		if (separatorInsets == null) {
			separatorInsets = new Insets(8, 0, 0, 0);
		}
		return separatorInsets;
	}
	
	private JButton schedulerAddButton;
	
	public JButton getSchedulerAddButton() {
		if (schedulerAddButton == null) {
			schedulerAddButton = new JButton(getSchedulerAddAction());
			schedulerAddButton.setBackground(new Color(0xd3d3d3));
		}
		return schedulerAddButton;
	}
	
	private Action schedulerAddAction;
	
	public Action getSchedulerAddAction() {
		if (schedulerAddAction == null) {
			schedulerAddAction = new JSSchedulerAddAction();
		}
		return schedulerAddAction;
	}
	
	private JButton schedulerEditButton;
	
	public JButton getSchedulerEditButton() {
		if (schedulerEditButton == null) {
			schedulerEditButton = new JButton(getSchedulerEditAction());
			schedulerEditButton.setBackground(new Color(0xd3d3d3));
		}
		return schedulerEditButton;
	}
	
	private Action schedulerEditAction;
	
	public Action getSchedulerEditAction() {
		if (schedulerEditAction == null) {
			schedulerEditAction = new JSSchedulerEditAction();
		}
		return schedulerEditAction;
	}
	
	private JButton schedulerRemoveButton;
	
	public JButton getSchedulerRemoveButton() {
		if (schedulerRemoveButton == null) {
			schedulerRemoveButton = new JButton(getSchedulerRemoveAction());
			schedulerRemoveButton.setBackground(new Color(0xd3d3d3));
		}
		return schedulerRemoveButton;
	}
	
	private Action schedulerRemoveAction;
	
	public Action getSchedulerRemoveAction() {
		if (schedulerRemoveAction == null) {
			schedulerRemoveAction = new JSSchedulerRemoveAction();
		}
		return schedulerRemoveAction;
	}
	
	private JButton schedulerUpButton;
	
	public JButton getSchedulerUpButton() {
		if (schedulerUpButton == null) {
			schedulerUpButton = new JButton(getSchedulerUpAction());
			schedulerUpButton.setBackground(new Color(0xd3d3d3));
		}
		return schedulerUpButton;
	}
	
	private Action schedulerUpAction;
	
	public Action getSchedulerUpAction() {
		if (schedulerUpAction == null) {
			schedulerUpAction = new JSSchedulerUpAction();
		}
		return schedulerUpAction;
	}
	
	private JButton schedulerDownButton;
	
	public JButton getSchedulerDownButton() {
		if (schedulerDownButton == null) {
			schedulerDownButton = new JButton(getSchedulerDownAction());
			schedulerDownButton.setBackground(new Color(0xd3d3d3));
		}
		return schedulerDownButton;
	}
	
	private Action schedulerDownAction;
	
	public Action getSchedulerDownAction() {
		if (schedulerDownAction == null) {
			schedulerDownAction = new JSSchedulerDownAction();
		}
		return schedulerDownAction;
	}
	
	private JButton schedulerDirectoryButton;
	
	public JButton getSchedulerDirectoryButton() {
		if (schedulerDirectoryButton == null) {
			schedulerDirectoryButton = new JButton(getSchedulerDirectoryAction());
			schedulerDirectoryButton.setBackground(new Color(0xd3d3d3));
		}
		return schedulerDirectoryButton;
	}
	
	private Action schedulerDirectoryAction;
	
	public Action getSchedulerDirectoryAction() {
		if (schedulerDirectoryAction == null) {
			schedulerDirectoryAction = new JSSchedulerDirectoryAction();
		}
		return schedulerDirectoryAction;
	}
	
	private JButton schedulerRunButton;
	
	public JButton getSchedulerRunButton() {
		if (schedulerRunButton == null) {
			schedulerRunButton = new JButton(getSchedulerRunAction());
			schedulerRunButton.setBackground(new Color(0xd3d3d3));
		}
		return schedulerRunButton;
	}
	
	private Action schedulerRunAction;
	
	public Action getSchedulerRunAction() {
		if (schedulerRunAction == null) {
			schedulerRunAction = new JSSchedulerRunAction();
		}
		return schedulerRunAction;
	}
	
	private JButton schedulerSaveButton;
	
	public JButton getSchedulerSaveButton() {
		if (schedulerSaveButton == null) {
			schedulerSaveButton = new JButton(getSchedulerSaveAction());
			schedulerSaveButton.setBackground(new Color(0xd3d3d3));
		}
		return schedulerSaveButton;
	}
	
	private Action schedulerSaveAction;
	
	public Action getSchedulerSaveAction() {
		if (schedulerSaveAction == null) {
			schedulerSaveAction = new JSSchedulerSaveAction();
		}
		return schedulerSaveAction;
	}
	
	private JScrollPane schedulerScrollPane;
	
	public JScrollPane getSchedulerScrollPane() {
		if (schedulerScrollPane == null) {
			schedulerScrollPane = new JSSchedulerScrollPane();
			schedulerScrollPane.setViewportView(getSchedulerTable());
		}
		return schedulerScrollPane;
	}
	
	private JTable schedulerTable;
	
	public JTable getSchedulerTable() {
		if (schedulerTable == null) {
			schedulerTable = new JTable(getSchedulerTableModel());
			schedulerTable.putClientProperty("terminateEditOnFocusLost", true);
			JTableHeader schedulerTableHeader = schedulerTable.getTableHeader();
			TableCellRenderer schedulerTableHeaderDefaultRenderer = schedulerTableHeader.getDefaultRenderer();
			TableColumnModel schedulerTableColumnModel = schedulerTable.getColumnModel();
			JTextField centerTextField = new JTextField();
			centerTextField.setHorizontalAlignment(SwingConstants.CENTER);
			centerTextField.setBorder(null);
			int columnCount = schedulerTableColumnModel.getColumnCount();
			for (int i = 0; i < columnCount; i++) {
				TableColumn schedulerTableColumn = schedulerTableColumnModel.getColumn(i);
				Object value = schedulerTableColumn.getHeaderValue();
				TableCellRenderer schedulerTableColumnHeaderRenderer = schedulerTableColumn.getHeaderRenderer();
				schedulerTableColumnHeaderRenderer = schedulerTableColumnHeaderRenderer != null ? schedulerTableColumnHeaderRenderer : schedulerTableHeaderDefaultRenderer;
				Component schedulerTableHeaderRendererComponent = schedulerTableColumnHeaderRenderer.getTableCellRendererComponent(schedulerTable, value, false, false, 0, i);
				schedulerTableColumn.setMinWidth(schedulerTableHeaderRendererComponent.getPreferredSize().width);
			}
			schedulerTable.setComponentPopupMenu(getSchedulerTablePopupMenu());
		}
		return schedulerTable;
	}
	
	private TableModel schedulerTableModel;
	
	public TableModel getSchedulerTableModel() {
		if (schedulerTableModel == null) {
			schedulerTableModel = new JSSchedulerTableModel(getSchedulerColumnClassMap());
			schedulerTableModel.addTableModelListener(getSchedulerTableModelListener());
		}
		return schedulerTableModel;
	}
	
	private JPopupMenu schedulerTablePopupMenu;
	
	public JPopupMenu getSchedulerTablePopupMenu() {
		if (schedulerTablePopupMenu == null) {
			schedulerTablePopupMenu = new JPopupMenu();
			schedulerTablePopupMenu.add(getSchedulerTableMenuItem());
		}
		return schedulerTablePopupMenu;
	}
	
	public JMenuItem schedulerTableShowNextDatesMenuItem;
	
	public JMenuItem getSchedulerTableMenuItem() {
		if (schedulerTableShowNextDatesMenuItem == null) {
			schedulerTableShowNextDatesMenuItem = new JMenuItem(getSchedulerTableShowNextDatesAction());
		}
		return schedulerTableShowNextDatesMenuItem;
	}
	
	public Action schedulerTableShowNextDatesAction;
	
	public Action getSchedulerTableShowNextDatesAction() {
		if (schedulerTableShowNextDatesAction == null) {
			schedulerTableShowNextDatesAction = new JSSchedulerTableShowNextDatesAction();
		}
		return schedulerTableShowNextDatesAction;
	}
	
	private Map<String, Class<?>> schedulerColumnClassMap;
	
	public Map<String, Class<?>> getSchedulerColumnClassMap() {
		if (schedulerColumnClassMap == null) {
			schedulerColumnClassMap = new LinkedHashMap<String, Class<?>>();
			schedulerColumnClassMap.put(JSI18n.getText(getClass(), "[ min (0-59|*) ]  [ hour (0-23|*) ]  [ day of month (1-31|*) ]  [ month (1-12|*) ]  [ day of week (0-6|*) ]  [ command to be executed ]"), String.class);
		}
		return schedulerColumnClassMap;
	}
	
	private TableModelListener schedulerTableModelListener;
	
	public TableModelListener getSchedulerTableModelListener() {
		if (schedulerTableModelListener == null) {
			schedulerTableModelListener = new JSSchedulerTableModelListener();
		}
		return schedulerTableModelListener;
	}
	
	public static void main(String[] args) throws URISyntaxException {
		
		JSScheduler scheduler = JSScheduler.getInstance();
		JSSchedulerFrame schedulerFrame = scheduler.getSchedulerFrame();
		schedulerFrame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		schedulerFrame.pack();
		schedulerFrame.setLocationRelativeTo(null);
		schedulerFrame.setExtendedState(schedulerFrame.getExtendedState() | JFrame.MAXIMIZED_BOTH);
		schedulerFrame.setVisible(true);
		scheduler.setFile(new File(JSSchedulerFrame.class.getResource("JSSchedulerFrame.scheduler").toURI()));
		scheduler.load();
		SecondaryLoop secondaryLoop = Toolkit.getDefaultToolkit().getSystemEventQueue().createSecondaryLoop();
		secondaryLoop.enter();
	}
}
