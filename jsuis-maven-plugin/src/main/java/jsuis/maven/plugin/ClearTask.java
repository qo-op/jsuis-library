package jsuis.maven.plugin;

import java.util.Map;

import org.apache.maven.plugins.annotations.Parameter;

import jsuis.script.task.general.JSClearTask;

/**
 * Clear task
 * 
 * @author Yassuo Toda
 */
public class ClearTask extends JSClearTask {

    @Parameter
	private Map<String, Object> parameterMap;
}
