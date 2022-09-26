package jsuis.maven.plugin;

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
    private Map<String, Object> arguments;
    
    public void setArguments(Map<String, Object> arguments) {
		getParameterMap().put("arguments", arguments);
	}
}
