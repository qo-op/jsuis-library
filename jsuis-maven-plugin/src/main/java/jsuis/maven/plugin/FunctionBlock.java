package jsuis.maven.plugin;

import java.util.List;

import org.apache.maven.plugins.annotations.Parameter;

import jsuis.script.block.JSFunctionBlock;
import jsuis.script.task.JSTask;

/**
 * Function block
 * 
 * @author Yassuo Toda
 */
public class FunctionBlock extends JSFunctionBlock {
	
    @Parameter
    private List<JSTask> taskList;
}
