package jsuis.maven.plugin;

import java.util.Map;

import org.apache.maven.plugins.annotations.Parameter;

import jsuis.script.task.general.JSLogTask;

/**
 * Log task
 * 
 * @author Yassuo Toda
 */
public class LogTask extends JSLogTask {

    @Parameter
	private Map<String, Object> parameterMap;
    
	@Override
	public void execute() throws Exception {
		
		String text = getString("text");
		
		WorkMojo workMojo = (WorkMojo) getBlock().get("workMojo");
		workMojo.getLog().info(text);
	}
}
