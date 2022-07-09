package jsuis.maven.plugin;

import java.util.Map;

import org.apache.maven.plugins.annotations.Parameter;

import jsuis.script.task.general.JSSetTask;

/**
 * Set task
 * 
 * @author Yassuo Toda
 */
public class SetTask extends JSSetTask {

    @Parameter
	private Map<String, Object> valueMap;
}
