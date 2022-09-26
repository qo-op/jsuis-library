package jsuis.maven.plugin;

import java.util.Map;

import org.apache.maven.plugins.annotations.Parameter;

import jsuis.script.task.directory.JSDirectoryListTask;

/**
 * Directory list task
 * 
 * @author Yassuo Toda
 */
public class DirectoryListTask extends JSDirectoryListTask {

    @Parameter
	private Map<String, Object> parameterMap;
}
