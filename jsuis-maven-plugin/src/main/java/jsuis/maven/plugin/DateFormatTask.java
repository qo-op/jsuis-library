package jsuis.maven.plugin;

import java.util.Map;

import org.apache.maven.plugins.annotations.Parameter;

import jsuis.script.task.date.JSDateFormatTask;

/**
 * Date format task
 * 
 * @author Yassuo Toda
 */
public class DateFormatTask extends JSDateFormatTask {

    @Parameter
	private Map<String, Object> parameterMap;
}
