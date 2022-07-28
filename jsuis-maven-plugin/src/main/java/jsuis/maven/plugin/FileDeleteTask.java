package jsuis.maven.plugin;

import java.util.Map;

import org.apache.maven.plugins.annotations.Parameter;

import jsuis.script.task.file.JSFileDeleteTask;

/**
 * File delete task
 * 
 * @author Yassuo Toda
 */
public class FileDeleteTask extends JSFileDeleteTask {

    @Parameter
	private Map<String, Object> parameterMap;
}
