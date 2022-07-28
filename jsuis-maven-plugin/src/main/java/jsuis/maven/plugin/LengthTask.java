package jsuis.maven.plugin;

import java.util.Map;

import org.apache.maven.plugins.annotations.Parameter;

import jsuis.script.task.general.JSLengthTask;

/**
 * Length task
 * 
 * @author Yassuo Toda
 *
 */
public class LengthTask extends JSLengthTask {

    @Parameter
	private Map<String, Object> parameterMap;
}
