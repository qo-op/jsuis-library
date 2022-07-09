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

	public JSIfTask() {
	}
	
	public JSIfTask(Map<String, Object> valueMap) {
		super(valueMap);
	}
	
	@JSParameter(name = "name", value = "if")
	@JSParameter(name = "condition", value = "true")
	private Map<String, Object> valueMap;
	
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