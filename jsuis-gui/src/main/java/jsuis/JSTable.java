package jsuis;

import javax.swing.JTable;
import javax.swing.table.TableModel;

/**
 * Table
 * 
 * @author Yassuo Toda
 */
public class JSTable extends JTable {

	private static final long serialVersionUID = 1L;
	
	public JSTable(TableModel tableModel) {
		super(tableModel);
		putClientProperty("terminateEditOnFocusLost", true);
	}
}
