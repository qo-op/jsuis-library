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
 * variable = callee();
 * variable = callee({ argument : value, argument : value, .... });
 * 
 * callee();
 * callee({ argument : value, argument : value, .... });
 * 
 * @author Yassuo Toda
 */
public class JSCallTask extends JSTask {
	
	@JSParameter(name = "variable")
	@JSParameter(name = "callee")
	@JSParameter(type = Map.class, name = "arguments")
	private Map<String, Object> parameterMap;
	
	@Override
	public void execute() throws Exception {
		
		String variable = getString("variable");
		String callee = getString("callee");
		Map<String, Object> argumentMap = getMap("arguments");
		
		JSBlock block = getBlock();
		JSFunctionTask functionTask = (JSFunctionTask) block.get(callee + "()");
		if (functionTask == null) {
			throw new Exception(String.format("Function '%s' not found.", callee + "()"));
		}
		Object result = execute(block, functionTask, argumentMap);
		if (variable != null && !variable.isEmpty()) {
			block.set(variable, result);
		}
	}
	
	public static Object execute(JSBlock block, JSAbstractFunctionTask functionTask, Map<String, Object> argumentValueMap) throws Exception {
		JSFunctionBlock functionBlock = functionTask.getFunctionBlock();
		Stack<Bindings> bindingsStack = functionBlock.getBindingsStack();
		bindingsStack.push(functionBlock.getBindings());
		functionBlock.setBindings(new JSBindings());
		try {
			functionBlock.putAll(translate(block, functionTask, argumentValueMap));
			functionBlock.execute();
			return null;
		} catch (JSReturnException e) {
			return e.getResult();
		} finally {
			functionBlock.setBindings(bindingsStack.pop());
		}
	}

	public static Map<String, Object> translate(JSBlock block, JSAbstractFunctionTask functionTask, Map<String, Object> argumentValueMap) throws IOException, ScriptException {
		Map<String, Object> newValueMap = new HashMap<>();
		Map<String, JSArgument> argumentMap = functionTask.getArgumentMap();
		Set<String> keySet = argumentMap.keySet();
		if (argumentValueMap != null) {
			for (String key : keySet) {
				JSArgument argument = argumentMap.get(key);
				if (argumentValueMap.containsKey(key)) {
					newValueMap.put(key, block.parse(argumentValueMap.get(key), argument.getType()));
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

	@Override
	public <T> T accept(JSTaskVisitor<T> visitor) {
		return visitor.visitCallTask(this);
	}
}
