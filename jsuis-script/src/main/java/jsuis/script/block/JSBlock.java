package jsuis.script.block;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.script.Bindings;
import javax.script.ScriptEngine;
import javax.script.ScriptException;

import jsuis.converter.JSConvertUtils;
import jsuis.script.bindings.JSScriptContext;
import jsuis.script.engine.JSScriptEngine;
import jsuis.script.task.JSConditionalTask;
import jsuis.script.task.JSLoopTask;
import jsuis.script.task.JSTask;
import jsuis.script.task.JSTryTask;
import jsuis.script.variable.visitor.JSVariableTranslator;
import jsuis.script.visitor.JSBlockVisitor;

/**
 * Block
 * 
 * @author Yassuo Toda
 */
public class JSBlock extends JSScriptContext {
	
	public JSBlock() {
	}
	
	public JSBlock(List<JSTask> taskList) {
		addAll(taskList);
	}
	
	public void addAll(List<JSTask> taskList) {
		getTaskList().addAll(taskList); 
	}
	
	public void add(JSTask task) {
		getTaskList().add(task); 
	}
	
	private List<JSTask> taskList = new ArrayList<JSTask>();
	
	public List<JSTask> getTaskList() {
		return taskList;
	}
	
	public void setTaskList(List<JSTask> taskList) {
		this.taskList = taskList;
	}
	
	public void execute() throws Exception {
		
		List<JSTask> taskList = getTaskList();
		for (JSTask task : taskList) {
			System.out.println(task.getClass());
			task.setBlock(this);
			if (task instanceof JSConditionalTask) {
				JSConditionalTask conditionalTask = (JSConditionalTask) task;
				JSIfBlock ifBlock = conditionalTask.getIfBlock();
				ifBlock.setBlock(this);
				JSElseBlock elseBlock = conditionalTask.getElseBlock();
				elseBlock.setBlock(this);
			} else if (task instanceof JSLoopTask) {
				JSLoopTask loopTask = (JSLoopTask) task;
				JSLoopBlock lookBlock = loopTask.getLoopBlock();
				lookBlock.setBlock(this);
			} else if (task instanceof JSTryTask) {
				JSTryTask tryTask = (JSTryTask) task;
				JSTryBlock tryBlock = tryTask.getTryBlock();
				tryBlock.setBlock(this);
				JSCatchBlock catchBlock = tryTask.getCatchBlock();
				catchBlock.setBlock(this);
				JSFinallyBlock finallyBlock = tryTask.getFinallyBlock();
				finallyBlock.setBlock(this);
			}
			task.execute();
		}
	}
	
	public void clear() {
		Bindings bindings = getBindings();
		bindings.clear();
	}
	
	public void putAll(Map<String, Object> parameterMap) {
		Bindings bindings = getBindings();
		bindings.putAll(parameterMap);
	}
	
	public boolean contains(String key) {
		Bindings compoundBindings = getCompoundBindings();
		return compoundBindings.containsKey(key);
	}
	
	public Object get(String key) {
		Bindings compoundBindings = getCompoundBindings();
		return compoundBindings.get(key);
	}
	
	public boolean let(String key, Object value) {
		Bindings bindings = getBindings();
		boolean success = !bindings.containsKey(key);
		if (success) {
			bindings.put(key, value);
			return success;
		}
		if (!success) {
			throw new RuntimeException(String.format("'%s' can't be defined more than one time.", key));
		}
		return success;
	}
	
	public boolean set(String key, Object value) {
		Bindings bindings = getBindings();
		boolean success = bindings.containsKey(key);
		if (success) {
			bindings.put(key, value);
			return success;
		}
		JSBlock block = getBlock();
		if (block != null) {
			success = block.set(key, value);
		}
		if (!success) {
			throw new RuntimeException(String.format("'%s' is not defined.", key));
		}
		return success;
	}
	
	public Object parse(Object value, Class<?> type) throws IOException, ScriptException {
		if (value == null) {
			return null;
		}
		if (value instanceof String) {
			return parseString((String) value, type);
		} else {
			return parseObject(value, type);
		}
	}
	
	private Object parseString(String string, Class<?> type) throws ScriptException {
		if (type == String.class) {
			if (string.trim().isEmpty()) {
				return string;
			}
		// } else if (type != Date.class && type != File.class) {
		} else if (type == Boolean.class) {
			if (string.trim().startsWith("=")) {
				string = string.substring(string.indexOf("=") + 1);
			}
			if (string.startsWith("#{") && string.endsWith("}")) {
				string = string.substring(2, string.length() - 1);
			}
			string = "=" + string;
		}
		Object object = translate(string);
		if (object instanceof String) {
			string = (String) object;
			if (string.trim().startsWith("=")) {
				object = eval(string.substring(string.indexOf("=") + 1));
			}
		}
		return parseObject(object, type);
	}
	
	private Object parseObject(Object object, Class<?> type) {
		return JSConvertUtils.convert(object, type);
	}
	
	private Object translate(String value) throws ScriptException {
		if (value == null) {
			return null;
		}
		return getVariableTranslator().translate(value);
	}
	
	public Object eval(String script) throws ScriptException {
		if (script == null) {
			return null;
		}
		ScriptEngine scriptEngine = JSScriptEngine.getInstance();
		return scriptEngine.eval(script, getCompoundBindings());
	}
	
	private JSVariableTranslator variableTranslator;
	
	public JSVariableTranslator getVariableTranslator() {
		if (variableTranslator == null) {
			variableTranslator = new JSVariableTranslator(getCompoundBindings());
		}
		return variableTranslator;
	}
	
	public <T> T accept(JSBlockVisitor<T> visitor) {
		return visitor.visitBlock(this);
	}
}
