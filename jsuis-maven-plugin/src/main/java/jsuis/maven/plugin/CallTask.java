package jsuis.maven.plugin;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.maven.plugins.annotations.Parameter;

import jsuis.script.task.general.JSCallTask;

/**
 * Call task
 * 
 * @author Yassuo Toda
 */
public class CallTask extends JSCallTask {

    @Parameter
	private Map<String, Object> parameterMap;
    
    @Parameter
    private List<Row> arguments;
    
    public void setArguments(List<Row> arguments) {
		List<List<Object>> map = new ArrayList<>();
		for (Row row : arguments) {
			map.add(row.getCellList());
		}
		getParameterMap().put("arguments", map);
	}
}
