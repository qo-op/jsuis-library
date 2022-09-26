package jsuis.maven.plugin;

import java.util.List;

import org.apache.maven.plugins.annotations.Parameter;

/**
 * Row
 * 
 * @author Yassuo Toda
 */
public class Row {

    @Parameter
	private List<Object> cellList;

	public List<Object> getCellList() {
		return cellList;
	}
}
