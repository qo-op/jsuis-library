package jsuis.maven.plugin;

import java.util.Map;

import org.apache.maven.plugins.annotations.Parameter;

import jsuis.script.task.file.JSFileZipTask;

/**
 * File zip task
 * 
 * @author Yassuo Toda
 */
public class FileZipTask extends JSFileZipTask {

    @Parameter
	private Map<String, Object> parameterMap;
}
