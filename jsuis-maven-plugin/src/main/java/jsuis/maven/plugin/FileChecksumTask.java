package jsuis.maven.plugin;

import java.util.Map;

import org.apache.maven.plugins.annotations.Parameter;

import jsuis.script.task.file.JSFileChecksumTask;

/**
 * File checksum task
 * 
 * @author Yassuo Toda
 */
public class FileChecksumTask extends JSFileChecksumTask {

    @Parameter
	private Map<String, Object> parameterMap;
}
