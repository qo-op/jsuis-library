package jsuis.maven.plugin;

import java.util.List;

import org.apache.maven.plugins.annotations.Parameter;

import jsuis.script.block.JSLoopBlock;
import jsuis.script.task.JSTask;

/**
 * Loop block
 * 
 * @author Yassuo Toda
 */
public class LoopBlock extends JSLoopBlock {
	
    @Parameter
    private List<JSTask> taskList;
}
