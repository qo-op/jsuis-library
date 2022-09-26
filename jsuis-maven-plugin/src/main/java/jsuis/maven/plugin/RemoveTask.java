package jsuis.maven.plugin;

import java.util.Map;

import org.apache.maven.plugins.annotations.Parameter;

import jsuis.script.task.general.JSRemoveTask;

/**
 * Remove task
 * 
 * @author Yassuo Toda
 */
public class RemoveTask extends JSRemoveTask {

    @Parameter
	private Map<String, Object> parameterMap;
}
