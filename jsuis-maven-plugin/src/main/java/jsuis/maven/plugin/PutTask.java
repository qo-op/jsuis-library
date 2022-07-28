package jsuis.maven.plugin;

import java.util.Map;

import org.apache.maven.plugins.annotations.Parameter;

import jsuis.script.task.general.JSPutTask;

/**
 * Put task
 * 
 * @author Yassuo Toda
 */
public class PutTask extends JSPutTask {

    @Parameter
	private Map<String, Object> parameterMap;
}
