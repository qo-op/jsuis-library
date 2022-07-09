package jsuis.maven.plugin;

import java.util.Map;

import org.apache.maven.plugins.annotations.Parameter;

import jsuis.script.task.general.JSBreakTask;

/**
 * Break task
 * 
 * @author Yassuo Toda
 */
public class BreakTask extends JSBreakTask {

    @Parameter
	private Map<String, Object> valueMap;
}
