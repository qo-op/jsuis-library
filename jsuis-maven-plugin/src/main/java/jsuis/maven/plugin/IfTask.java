package jsuis.maven.plugin;

import java.util.Map;

import org.apache.maven.plugins.annotations.Parameter;

import jsuis.script.task.general.JSIfTask;

/**
 * If task
 * 
 * @author Yassuo Toda
 */
public class IfTask extends JSIfTask {

    @Parameter
	private Map<String, Object> parameterMap;

    @Parameter
    private IfBlock ifBlock;

	public void setIfBlock(IfBlock ifBlock) {
		super.setIfBlock(ifBlock);
	}

    @Parameter
    private ElseBlock elseBlock;

	public void setElseBlock(ElseBlock elseBlock) {
		super.setElseBlock(elseBlock);
	}
}
