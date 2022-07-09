package jsuis.maven.plugin;

import java.util.List;

import org.apache.maven.plugins.annotations.Parameter;

import jsuis.script.block.JSElseBlock;
import jsuis.script.task.JSTask;

/**
 * Else block
 * 
 * @author Yassuo Toda
 */
public class ElseBlock extends JSElseBlock {
	
    @Parameter
    private List<JSTask> taskList;
}
