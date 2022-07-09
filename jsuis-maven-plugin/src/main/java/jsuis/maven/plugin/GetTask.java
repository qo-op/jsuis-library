package jsuis.maven.plugin;

import java.util.Map;

import org.apache.maven.plugins.annotations.Parameter;

import jsuis.script.task.general.JSGetTask;

/**
 * Get task
 * 
 * @author Yassuo Toda
 */
public class GetTask extends JSGetTask {

    @Parameter
	private Map<String, Object> valueMap;
}
