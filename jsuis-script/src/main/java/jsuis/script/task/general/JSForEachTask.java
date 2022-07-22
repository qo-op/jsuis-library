package jsuis.script.task.general;

import java.util.Map;

import jsuis.lang.JSBreakException;
import jsuis.lang.JSContinueException;
import jsuis.script.annotation.JSParameter;
import jsuis.script.block.JSLoopBlock;
import jsuis.script.task.JSLoopTask;
import jsuis.script.visitor.JSTaskVisitor;

/**
 * For each task
 * 
 * for (let variable of iterable) { ... }
 * 
 * @author Yassuo Toda
 */
public class JSForEachTask extends JSLoopTask {
	
	@JSParameter(name = "name", value = "for")
	@JSParameter(name = "variable")
	@JSParameter(name = "iterable")
	private Map<String, Object> parameterMap;
	
	@SuppressWarnings("unchecked")
	@Override
	public void execute() throws Exception {
		
		String variable = getString("variable");
		Object iterableObject = getObject("iterable");
		if (iterableObject instanceof Map) {
			Map<String, Object> map = (Map<String, Object>) iterableObject;
			iterableObject = map.keySet();
		}
		if (!(iterableObject instanceof Iterable)) {
			throw new Exception(String.format("Object '%s' is not a Iterable", iterableObject));
		}
		Iterable<Object> iterable = (Iterable<Object>) iterableObject;
		
		JSLoopBlock loopBlock = getLoopBlock();
		for (Object object : iterable) {
			loopBlock.clear();
			loopBlock.let(variable, object);
			if (!process()) {
				break;
			}
		}
	}
	
	public boolean process() throws Exception {
		try {
			JSLoopBlock loopBlock = getLoopBlock();
			loopBlock.execute();
			return true;
		} catch (JSBreakException e) {
			return false;
		} catch (JSContinueException e) {
			return true;
		}
	}

	@Override
	public <T> T accept(JSTaskVisitor<T> visitor) {
		return visitor.visitForEachTask(this);
	}
}
