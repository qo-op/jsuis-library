package jsuis.maven.plugin;

import java.util.Map;

import org.apache.maven.plugins.annotations.Parameter;

import jsuis.script.task.general.JSReturnTask;

/**
 * Return task
 * 
 * @author Yassuo Toda
 */
public class ReturnTask extends JSReturnTask {

    @Parameter
	private Map<String, Object> valueMap;
}
