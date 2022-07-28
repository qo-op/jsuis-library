package jsuis.script.block;

import java.util.List;
import java.util.Stack;

import javax.script.Bindings;

import jsuis.script.task.JSTask;

/**
 * Function block
 * 
 * @author Yassuo Toda
 */
public class JSFunctionBlock extends JSBlock {

	public JSFunctionBlock() {
	}
	
	public JSFunctionBlock(List<JSTask> taskList) {
		super(taskList);
	}

	private Stack<Bindings> bindingsStack;
	
	public Stack<Bindings> getBindingsStack() {
		if (bindingsStack == null) {
			bindingsStack = new Stack<>();
		}
		return bindingsStack;
	}
}
