package jsuis.maven.plugin;

import java.util.List;

import org.apache.maven.plugin.AbstractMojo;
import org.apache.maven.plugin.MojoExecutionException;
import org.apache.maven.plugin.MojoFailureException;
import org.apache.maven.plugins.annotations.Mojo;
import org.apache.maven.plugins.annotations.Parameter;

import jsuis.script.block.JSWorkBlock;
import jsuis.script.task.JSTask;

/**
 * Work mojo
 * 
 * @author Yassuo Toda
 */
@Mojo(name = "work")
public class WorkMojo extends AbstractMojo {
	
    @Parameter
    private List<JSTask> taskList;
	
	public void execute() throws MojoExecutionException, MojoFailureException {
		
		JSWorkBlock workBlock = new JSWorkBlock();
		workBlock.setTaskList(taskList);
		try {
			workBlock.execute();
		} catch (Exception e) {
			throw new MojoExecutionException(String.format("An exception ocurred while executing work."), e);
		}
	}
}
