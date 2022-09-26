package jsuis.maven.plugin;

import java.util.List;
import java.util.Map;

import org.apache.maven.plugins.annotations.Parameter;

import jsuis.script.task.general.JSProcessTask;

/**
 * Process task
 * 
 * @author Yassuo Toda
 */
public class ProcessTask extends JSProcessTask {

    @Parameter
	private Map<String, Object> parameterMap;
    
    @Parameter
	private List<Object> command;

    public void setCommand(List<Object> command) {
		getParameterMap().put("command", command);
	}
    
    @Parameter
    private Map<String, Object> environment;
    
    public void setEnvironment(Map<String, Object> environment) {
		getParameterMap().put("environment", environment);
	}
}
