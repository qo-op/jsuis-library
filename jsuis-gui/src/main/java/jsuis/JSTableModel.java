package jsuis;

import javax.swing.table.DefaultTableModel;

/**
 * Table model
 * 
 * @author Yassuo Toda
 */
public class JSTableModel extends DefaultTableModel {

	private static final long serialVersionUID = 1L;
	
	public JSTableModel(Object[] columnNames, int rowCount) {
		super(columnNames, rowCount); 
	}
}
