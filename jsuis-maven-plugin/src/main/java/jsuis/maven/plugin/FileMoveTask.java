package jsuis.maven.plugin;

import java.util.Map;

import org.apache.maven.plugins.annotations.Parameter;

import jsuis.script.task.file.JSFileMoveTask;

/**
 * File move task
 * 
 * @author Yassuo Toda
 */
public class FileMoveTask extends JSFileMoveTask {

    @Parameter
	private Map<String, Object> parameterMap;
}
