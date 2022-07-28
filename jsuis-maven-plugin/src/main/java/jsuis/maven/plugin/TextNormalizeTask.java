package jsuis.maven.plugin;

import java.util.Map;

import org.apache.maven.plugins.annotations.Parameter;

import jsuis.script.task.text.JSTextNormalizeTask;

/**
 * Text normalize task
 * 
 * @author Yassuo Toda
 *
 */
public class TextNormalizeTask extends JSTextNormalizeTask {
	
    @Parameter
	private Map<String, Object> parameterMap;
}
