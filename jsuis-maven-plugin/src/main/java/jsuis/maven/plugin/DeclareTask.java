package jsuis.maven.plugin;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.maven.plugins.annotations.Parameter;

import jsuis.script.task.general.JSDeclareTask;

/**
 * Declare task
 * 
 * @author Yassuo Toda
 */
public class DeclareTask extends JSDeclareTask {

    @Parameter
	private Map<String, Object> parameterMap;
    
    @Parameter
	private List<Object> listValue;

    public void setListValue(List<Object> listValue) {
		getParameterMap().put("listValue", listValue);
	}
    
    @Parameter
    private List<Row> mapValue;
    
    public void setMapValue(List<Row> mapValue) {
		List<List<Object>> map = new ArrayList<>();
		for (Row row : mapValue) {
			map.add(row.getCellList());
		}
		getParameterMap().put("mapValue", map);
	}
    
    @Parameter
    private List<Row> tableValue;
    
    public void setTableValue(List<Row> tableValue) {
		List<List<Object>> map = new ArrayList<>();
		for (Row row : tableValue) {
			map.add(row.getCellList());
		}
		getParameterMap().put("tableValue", map);
	}
}
