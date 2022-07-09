package jsuis.maven.plugin;

import java.util.Map;

import org.apache.maven.plugins.annotations.Parameter;

import jsuis.script.task.general.JSStartTask;

public class StartTask extends JSStartTask {
	
    @Parameter
	private Map<String, Object> valueMap;
    
    @Parameter
    private FunctionBlock functionBlock;

	public void setFunctionBlock(FunctionBlock functionBlock) {
		super.setFunctionBlock(functionBlock);
	}
}
