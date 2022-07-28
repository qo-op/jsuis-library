package jsuis.maven.plugin;

import java.util.Map;

import org.apache.maven.plugins.annotations.Parameter;

import jsuis.script.task.text.JSTextSliceTask;

/**
 * Text slice task
 * 
 * @author Yassuo Toda
 *
 */
public class TextSliceTask extends JSTextSliceTask {
	
    @Parameter
	private Map<String, Object> parameterMap;
}
