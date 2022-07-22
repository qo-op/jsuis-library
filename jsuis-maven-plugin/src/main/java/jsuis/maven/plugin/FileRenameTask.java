package jsuis.maven.plugin;

import java.util.Map;

import org.apache.maven.plugins.annotations.Parameter;

import jsuis.script.task.file.JSFileRenameTask;

/**
 * File rename task
 * 
 * @author Yassuo Toda
 */
public class FileRenameTask extends JSFileRenameTask {

    @Parameter
	private Map<String, Object> parameterMap;
}
