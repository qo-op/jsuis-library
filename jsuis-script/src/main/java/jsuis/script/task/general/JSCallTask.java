package jsuis.script.task.general;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.Stack;

import javax.script.Bindings;
import javax.script.ScriptException;

import jsuis.lang.JSReturnException;
import jsuis.script.annotation.JSParameter;
import jsuis.script.argument.JSArgument;
import jsuis.script.bindings.JSBindings;
import jsuis.script.block.JSBlock;
import jsuis.script.block.JSFunctionBlock;
import jsuis.script.task.JSTask;
import jsuis.script.visitor.JSTaskVisitor;

/**
 * Call task
 * 
 * variable = callee({ argumentName1 : value1, argumentName2 : value2, .... });
 * callee({ argumentName1 : value1, argumentName2 : value2, .... });
 * 
 * @author Yassuo Toda
 */
public class JSCallTask extends JSTask {

	public JSCallTask() {
	}
	
	public JSCallTask(Map<String, Object> valueMap) {
		super(valueMap);
	}
	
	@JSParameter(name = "name", value = "call")
	@JSParameter(name = "variable")
	@JSParameter(name = "callee", value = "f")
	@JSParameter(type = Map.class, name = "values")
	private Map<String, Object> valueMap;
	
	@Override
	public void execute() throws Exception {
		
		String variable = getString("variable");
		String callee = getString("callee");
		Map<String, Object> valueMap = getMap("values");
		
		JSBlock block = getBlock();
		JSFunctionTask functionTask = (JSFunctionTask) block.get(callee + "()");
		if (functionTask == null) {
			throw new Exception(String.format("Function '%s' not found.", callee + "()"));
		}
		Object result = execute(block, functionTask, valueMap);
		if (!variable.isEmpty()) {
			block.set(variable, result);
		}
	}
	
	public static Object execute(JSBlock block, JSAbstractFunctionTask functionTask, Map<String, Object> valueMap) throws Exception {
		JSFunctionBlock functionBlock = functionTask.getFunctionBlock();
		Stack<Bindings> bindingsStack = functionBlock.getBindingsStack();
		bindingsStack.push(functionBlock.getBindings());
		functionBlock.setBindings(new JSBindings());
		try {
			functionBlock.putAll(translate(block, functionTask, valueMap));
			functionBlock.execute();
			return null;
		} catch (JSReturnException e) {
			return e.getResult();
		} finally {
			functionBlock.setBindings(bindingsStack.pop());
		}
	}

	public static Map<String, Object> translate(JSBlock block, JSAbstractFunctionTask functionTask, Map<String, Object> valueMap) throws IOException, ScriptException {
		Map<String, Object> newValueMap = new HashMap<>();
		Map<String, JSArgument> argumentMap = functionTask.getArgumentMap();
		Set<String> keySet = argumentMap.keySet();
		if (valueMap != null) {
			for (String key : keySet) {
				JSArgument argument = argumentMap.get(key);
				if (valueMap.containsKey(key)) {
					newValueMap.put(key, block.parse(valueMap.get(key), argument.getType(), argument.getFormat()));
				} else {
					newValueMap.put(key, argument.getValue());
				}
			}
		} else {
			for (String key : keySet) {
				JSArgument argument = argumentMap.get(key);
				newValueMap.put(key, argument.getValue());
			}
		}
		return newValueMap;
	}
	
	private Map<String, String> argumentMap;
	
	public Map<String, String> getArgumentMap() {
		return argumentMap;
	}

	public void setArgumentMap(Map<String, String> argumentMap) {
		this.argumentMap = argumentMap;
	}

	@Override
	public <T> T accept(JSTaskVisitor<T> visitor) {
		return visitor.visitCallTask(this);
	}
}
