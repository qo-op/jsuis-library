package jsuis.maven.plugin;

import java.util.Map;

import org.apache.maven.plugins.annotations.Parameter;

import jsuis.script.task.file.JSFileUnzipTask;

/**
 * File unzip task
 * 
 * @author Yassuo Toda
 */
public class FileUnzipTask extends JSFileUnzipTask {

    @Parameter
	private Map<String, Object> parameterMap;
}
