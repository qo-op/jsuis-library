package jsuis.maven.plugin;

import java.util.Map;

import org.apache.maven.plugins.annotations.Parameter;

import jsuis.script.task.text.JSTextReverseTask;

/**
 * Text reverse task
 * 
 * @author Yassuo Toda
 *
 */
public class TextReverseTask extends JSTextReverseTask {
	
    @Parameter
	private Map<String, Object> parameterMap;
}
