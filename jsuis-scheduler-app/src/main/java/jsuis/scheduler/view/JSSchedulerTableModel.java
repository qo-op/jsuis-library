package jsuis.scheduler.view;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.swing.table.AbstractTableModel;

/**
 * Scheduler table model
 * 
 * @author Yassuo Toda
 */
public class JSSchedulerTableModel extends AbstractTableModel {

	private static final long serialVersionUID = 1L;

	private String[] columnNames;
	private Class<?>[] columnClasses;
	
	public JSSchedulerTableModel(Map<String, Class<?>> columnClassMap) {
		Set<String> nameSet = columnClassMap.keySet();
		this.columnNames = nameSet.toArray(new String[nameSet.size()]);
		Collection<Class<?>> classCollection = columnClassMap.values();
		this.columnClasses = classCollection.toArray(new Class<?>[classCollection.size()]);
	}
	
	private List<Object[]> rowDataList = Collections.synchronizedList(new ArrayList<>());
	
	@Override
	public int getRowCount() {
		return rowDataList.size();
	}
	
	@Override
    public String getColumnName(int column) {
    	return columnNames[column];
    }
	
	@Override
    public Class<?> getColumnClass(int columnIndex) {
		return columnClasses[columnIndex];
	}
	
	@Override
	public int getColumnCount() {
		return columnNames.length;
	}
	
	@Override
	public Object getValueAt(int rowIndex, int columnIndex) {
		return rowDataList.get(rowIndex)[columnIndex];
	}
	
	@Override
    public void setValueAt(Object aValue, int rowIndex, int columnIndex) {
		int rowCount = getRowCount();
		if (rowIndex < rowCount) {
	    	rowDataList.get(rowIndex)[columnIndex] = aValue;
	    	fireTableCellUpdated(rowIndex, columnIndex);
			return;
		}
		Object[] rowData = null;
		for (int i = rowCount; i <= rowIndex; i++) {
			rowData = new Object[getColumnCount()];
			rowDataList.add(rowData);
		}
		rowData[columnIndex] = aValue;
		fireTableRowsInserted(rowCount, rowIndex);
	}
	
	/*
	@Override
	public boolean isCellEditable(int row, int col) {
		return true;
	}
	*/
	
	public void clear() {
		int rowCount = getRowCount();
		rowDataList.clear();
		fireTableRowsDeleted(0, rowCount);
	}
    
    public void addRow(Object[] rowData) {
		int row = getRowCount();
    	rowDataList.add(rowData);
        fireTableRowsInserted(row, row);
    }
	
    public void insertRow(int row, Object[] rowData) {
    	rowDataList.add(row, rowData);
        fireTableRowsInserted(row, row);
    }
	
    public void removeRow(int row) {
    	rowDataList.remove(row);
        fireTableRowsDeleted(row, row);
    }
    
    public void swap(int a, int b) {
    	if (a == b) {
    		return;
    	}
    	Object[] rowData = rowDataList.get(a);
    	rowDataList.set(a, rowDataList.get(b));
    	rowDataList.set(b, rowData);
    	if (a < b) {
    		if (a == b - 1) {
    	    	fireTableRowsUpdated(a, b);
    		}
	    	fireTableRowsUpdated(a, a);
	    	fireTableRowsUpdated(b, b);
    	} else {
    		if (a == b + 1) {
    	    	fireTableRowsUpdated(b, a);
    		}
	    	fireTableRowsUpdated(b, b);
	    	fireTableRowsUpdated(a, a);
    	}
    }
}
