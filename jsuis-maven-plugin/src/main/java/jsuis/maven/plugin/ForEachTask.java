package jsuis.maven.plugin;

import java.util.Map;

import org.apache.maven.plugins.annotations.Parameter;

import jsuis.script.task.general.JSForEachTask;

/**
 * For each task
 * 
 * @author Yassuo Toda
 */
public class ForEachTask extends JSForEachTask {

    @Parameter
	private Map<String, Object> parameterMap;

    @Parameter
    private LoopBlock loopBlock;

	public void setLoopBlock(LoopBlock loopBlock) {
		super.setLoopBlock(loopBlock);
	}
}
