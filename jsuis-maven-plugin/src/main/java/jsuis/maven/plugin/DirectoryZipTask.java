package jsuis.maven.plugin;

import java.util.Map;

import org.apache.maven.plugins.annotations.Parameter;

import jsuis.script.task.directory.JSDirectoryZipTask;

/**
 * Directory zip task
 * 
 * @author Yassuo Toda
 */
public class DirectoryZipTask extends JSDirectoryZipTask {

    @Parameter
	private Map<String, Object> parameterMap;
}
