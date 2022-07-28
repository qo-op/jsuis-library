package jsuis.maven.plugin;

import java.util.Map;

import org.apache.maven.plugins.annotations.Parameter;

import jsuis.script.task.file.JSFileWriteTask;

/**
 * File write task
 * 
 * @author Yassuo Toda
 */
public class FileWriteTask extends JSFileWriteTask {

    @Parameter
	private Map<String, Object> parameterMap;
}
