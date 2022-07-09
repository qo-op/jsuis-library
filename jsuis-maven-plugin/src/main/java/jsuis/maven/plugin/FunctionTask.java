package jsuis.maven.plugin;

import java.util.Map;

import org.apache.maven.plugins.annotations.Parameter;

import jsuis.script.task.general.JSFunctionTask;

/**
 * Function task
 * 
 * @author Yassuo Toda
 */
public class FunctionTask extends JSFunctionTask {

    @Parameter
	private Map<String, Object> valueMap;
    
    @Parameter
    private FunctionBlock functionBlock;

	public void setFunctionBlock(FunctionBlock functionBlock) {
		super.setFunctionBlock(functionBlock);
	}
}
