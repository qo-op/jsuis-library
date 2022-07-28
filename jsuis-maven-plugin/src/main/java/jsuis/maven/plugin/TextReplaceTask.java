package jsuis.maven.plugin;

import java.util.Map;

import org.apache.maven.plugins.annotations.Parameter;

import jsuis.script.task.text.JSTextReplaceTask;

/**
 * Text replace task
 * 
 * @author Yassuo Toda
 *
 */
public class TextReplaceTask extends JSTextReplaceTask {
	
    @Parameter
	private Map<String, Object> parameterMap;
}
