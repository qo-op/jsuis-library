package jsuis.maven.plugin;

import java.util.Map;

import org.apache.maven.plugins.annotations.Parameter;

import jsuis.script.task.file.JSFileExistsTask;

/**
 * File exists task
 * 
 * @author Yassuo Toda
 */
public class FileExistsTask extends JSFileExistsTask {

    @Parameter
	private Map<String, Object> parameterMap;
}
