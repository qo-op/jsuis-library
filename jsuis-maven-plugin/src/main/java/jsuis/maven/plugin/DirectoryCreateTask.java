package jsuis.maven.plugin;

import java.util.Map;

import org.apache.maven.plugins.annotations.Parameter;

import jsuis.script.task.directory.JSDirectoryCreateTask;

/**
 * Directory create task
 * 
 * @author Yassuo Toda
 */
public class DirectoryCreateTask extends JSDirectoryCreateTask {

    @Parameter
	private Map<String, Object> parameterMap;
}
