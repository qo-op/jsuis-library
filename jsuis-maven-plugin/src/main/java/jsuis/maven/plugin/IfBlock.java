package jsuis.maven.plugin;

import java.util.List;

import org.apache.maven.plugins.annotations.Parameter;

import jsuis.script.block.JSIfBlock;
import jsuis.script.task.JSTask;

/**
 * If block
 * 
 * @author Yassuo Toda
 */
public class IfBlock extends JSIfBlock {
	
    @Parameter
    private List<JSTask> taskList;
}
