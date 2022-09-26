package jsuis.maven.plugin;

import java.util.Map;

import org.apache.maven.plugins.annotations.Parameter;

import jsuis.script.task.text.JSTextToLowerCaseTask;

/**
 * Text to lower case task
 * 
 * @author Yassuo Toda
 *
 */
public class TextToLowerCaseTask extends JSTextToLowerCaseTask {
	
    @Parameter
	private Map<String, Object> parameterMap;
}
