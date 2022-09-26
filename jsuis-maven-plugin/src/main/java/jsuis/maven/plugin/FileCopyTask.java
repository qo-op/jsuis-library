package jsuis.maven.plugin;

import java.util.Map;

import org.apache.maven.plugins.annotations.Parameter;

import jsuis.script.task.file.JSFileCopyTask;

/**
 * File copy task
 * 
 * @author Yassuo Toda
 */
public class FileCopyTask extends JSFileCopyTask {

    @Parameter
	private Map<String, Object> parameterMap;
}
