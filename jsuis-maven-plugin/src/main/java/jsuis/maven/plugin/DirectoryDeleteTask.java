package jsuis.maven.plugin;

import java.util.Map;

import org.apache.maven.plugins.annotations.Parameter;

import jsuis.script.task.directory.JSDirectoryDeleteTask;

/**
 * Directory delete task
 * 
 * @author Yassuo Toda
 */
public class DirectoryDeleteTask extends JSDirectoryDeleteTask {

    @Parameter
	private Map<String, Object> parameterMap;
}
