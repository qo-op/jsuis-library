package jsuis.maven.plugin;

import java.util.Map;

import org.apache.maven.plugins.annotations.Parameter;

import jsuis.script.task.directory.JSDirectoryCopyTask;

/**
 * Directory copy task
 * 
 * @author Yassuo Toda
 */
public class DirectoryCopyTask extends JSDirectoryCopyTask {

    @Parameter
	private Map<String, Object> parameterMap;
}
