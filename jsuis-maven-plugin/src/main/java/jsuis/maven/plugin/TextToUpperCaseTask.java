package jsuis.maven.plugin;

import java.util.Map;

import org.apache.maven.plugins.annotations.Parameter;

import jsuis.script.task.text.JSTextToUpperCaseTask;

/**
 * Text to upper case task
 * 
 * @author Yassuo Toda
 *
 */
public class TextToUpperCaseTask extends JSTextToUpperCaseTask {
	
    @Parameter
	private Map<String, Object> parameterMap;
}
