package jsuis.script.block;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.script.Bindings;
import javax.script.ScriptEngine;
import javax.script.ScriptException;

import com.oracle.truffle.js.scriptengine.GraalJSScriptEngine;

import jsuis.script.JSScriptConvertUtils;
import jsuis.script.bindings.JSCompoundBindings;
import jsuis.script.bindings.JSScriptContext;
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
	
	private JSBlock block;
	
	public JSBlock getBlock() {
		return block;
	}
	
	public void setBlock(JSBlock block) {
		this.block = block;
		Bindings compoundBindings = getCompoundBindings();
		if (compoundBindings instanceof JSCompoundBindings) {
			((JSCompoundBindings) getCompoundBindings()).setSecondary(block);
		} else {
			compoundBindings = new JSCompoundBindings(this, block);
		}
	}
	
	private Bindings compoundBindings;
	
	public Bindings getCompoundBindings() {
		if (compoundBindings == null) {
			compoundBindings = getBindings();
			JSBlock block = getBlock();
			if (block != null) {
				compoundBindings = new JSCompoundBindings(this, block);
			}
		}
		return compoundBindings;
	}
	
	public void execute() throws Exception {
		
		List<JSTask> taskList = getTaskList();
		for (JSTask task : taskList) {
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
	
	public void put(String key, Object value) {
		Bindings bindings = getBindings();
		bindings.put(key, value);
	}
	
	public void putAll(Map<String, Object> valueMap) {
		Bindings bindings = getBindings();
		bindings.putAll(valueMap);
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
	
	public Object get(String key) {
		Bindings compoundBindings = getCompoundBindings();
		return compoundBindings.get(key);
	}
	
	public Object parse(Object value, Class<?> type, String... formats) throws IOException, ScriptException {
		if (value == null) {
			return null;
		}
		if (value instanceof String) {
			return parseString((String) value, type, formats);
		} else {
			return parseObject(value, type, formats);
		}
	}
	
	public Object parseString(String string, Class<?> type, String... formats) throws ScriptException {
		if (type == String.class) {
			if (string.trim().isEmpty()) {
				return string;
			}
		} else {
			if (string.trim().startsWith("=")) {
				string = string.substring(string.indexOf("=") + 1);
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
		return parseObject(object, type, formats);
	}
	
	public Object parseObject(Object object, Class<?> type, String... formats) {
		object = JSScriptConvertUtils.convert(object, type, formats);
		if (object instanceof File) {
			File file = (File) object;
			object = translate(file);
		}
		return object;
	}
	
	public File translate(File file) {
		if (file == null) {
			return null;
		}
		if (!file.isAbsolute()) {
			String path = file.getPath();
		    file = new File(System.getProperty("user.dir"), path);
		}
		return file;
	}
	
	public Object translate(String value) throws ScriptException {
		if (value == null) {
			return null;
		}
		return getVariableTranslator().translate(value);
	}
	
	public Object eval(String script) throws ScriptException {
		if (script == null) {
			return null;
		}
		ScriptEngine scriptEngine = getScriptEngine();
		return scriptEngine.eval(script, getCompoundBindings());
	}
	
	private JSVariableTranslator variableTranslator;
	
	public JSVariableTranslator getVariableTranslator() {
		if (variableTranslator == null) {
			variableTranslator = new JSVariableTranslator(this);
		}
		return variableTranslator;
	}
	
	private ScriptEngine scriptEngine;
	
	public ScriptEngine getScriptEngine() {
		if (scriptEngine == null) {
			scriptEngine = GraalJSScriptEngine.create();
			scriptEngine.getContext();
		}
		return scriptEngine;
	}
	
	public <T> T accept(JSBlockVisitor<T> visitor) {
		return visitor.visitBlock(this);
	}
}
