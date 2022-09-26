package jsuis.maven.plugin;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.maven.plugins.annotations.Parameter;

import jsuis.script.task.general.JSStartTask;

/**
 * Start task
 * 
 * @author Yassuo Toda
 */
public class StartTask extends JSStartTask {
	
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
    
    @Parameter
    private FunctionBlock functionBlock;

	public void setFunctionBlock(FunctionBlock functionBlock) {
		super.setFunctionBlock(functionBlock);
	}
}
