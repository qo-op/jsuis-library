package jsuis.maven.plugin;

import java.util.Map;

import org.apache.maven.plugins.annotations.Parameter;

import jsuis.script.task.general.JSAddTask;

/**
 * Add task
 * 
 * @author Yassuo Toda
 */
public class AddTask extends JSAddTask {

    @Parameter
	private Map<String, Object> parameterMap;
}
