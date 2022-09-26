package jsuis.script.task.general;

import java.util.Map;

import jsuis.script.annotation.JSParameter;
import jsuis.script.block.JSElseBlock;
import jsuis.script.block.JSIfBlock;
import jsuis.script.task.JSConditionalTask;
import jsuis.script.visitor.JSTaskVisitor;

/**
 * If task
 * 
 * if (condition) { ... } else { ... }
 * 
 * @author Yassuo Toda
 */
public class JSIfTask extends JSConditionalTask {
	
	@JSParameter(name = "condition")
	private Map<String, Object> parameterMap;
	
	@Override
	public void execute() throws Exception {
		
		boolean condition = getBoolean("condition");
		
		if (condition) {
			JSIfBlock ifBlock = getIfBlock();
			ifBlock.clear();
			ifBlock.execute();
		} else {
			JSElseBlock elseBlock = getElseBlock();
			elseBlock.clear();
			elseBlock.execute();
		}
	}

	@Override
	public <T> T accept(JSTaskVisitor<T> visitor) {
		return visitor.visitIfTask(this);
	}
}
