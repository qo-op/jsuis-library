package jsuis.maven.plugin;

import java.util.Map;

import org.apache.maven.plugins.annotations.Parameter;

import jsuis.script.task.general.JSForTask;

/**
 * For task
 * 
 * @author Yassuo Toda
 */
public class ForTask extends JSForTask {

    @Parameter
	private Map<String, Object> valueMap;

    @Parameter
    private LoopBlock loopBlock;

	public void setLoopBlock(LoopBlock loopBlock) {
		super.setLoopBlock(loopBlock);
	}
}
