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
	private Map<String, Object> valueMap;
    
    @Parameter
    private List<Row> listValue;
    
    public void setListValue(List<Row> listValue) {
		List<List<Object>> list = new ArrayList<>();
		for (Row row : listValue) {
			list.add(row.getCellList());
		}
		getValueMap().put("listValue", list);
	}
    
    @Parameter
    private List<Row> mapValue;
    
    public void setMapValue(List<Row> mapValue) {
		List<List<Object>> map = new ArrayList<>();
		for (Row row : mapValue) {
			map.add(row.getCellList());
		}
		getValueMap().put("mapValue", map);
	}
}
