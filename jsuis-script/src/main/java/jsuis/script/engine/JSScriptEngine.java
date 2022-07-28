package jsuis.script.engine;

import java.io.Reader;

import javax.script.Bindings;
import javax.script.ScriptContext;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineFactory;
import javax.script.ScriptException;

import org.graalvm.polyglot.Context;
import org.graalvm.polyglot.HostAccess;

import com.oracle.truffle.js.scriptengine.GraalJSScriptEngine;

/**
 * Script engine
 * 
 * @author Yassuo Toda
 */
public class JSScriptEngine implements ScriptEngine {

	private static JSScriptEngine instance;
	
	public static JSScriptEngine getInstance() {
		if (instance == null) {
			instance = new JSScriptEngine();
		}
		return instance;
	}

	private ScriptEngine scriptEngine;
	
	public JSScriptEngine() {
		scriptEngine = GraalJSScriptEngine.create(null,
		        Context.newBuilder("js")
		        .allowHostAccess(HostAccess.ALL)
		        .allowHostClassLookup(s -> true)
		        .option("js.ecmascript-version", "2021"));
		try {
			scriptEngine.eval("var String = Java.type('java.lang.String');");
			scriptEngine.eval("var Boolean = Java.type('java.lang.Boolean');");
			scriptEngine.eval("var Date = Java.type('java.util.Date');");
			scriptEngine.eval("var Decimal = Java.type('java.math.BigDecimal');");
			scriptEngine.eval("var Double = Java.type('java.lang.Double');");
			scriptEngine.eval("var File = Java.type('java.io.File');");
			scriptEngine.eval("var Image = Java.type('java.awt.image.BufferedImage');");
			scriptEngine.eval("var Integer = Java.type('java.lang.Integer');");
			scriptEngine.eval("var List = Java.type('java.util.ArrayList');");
			scriptEngine.eval("var Map = Java.type('java.util.LinkedHashMap');");
			scriptEngine.eval("var task = Packages.jsuis.script.executor;");
			scriptEngine.eval("var log = function(text) { task.JSLog.log(text); };");
			scriptEngine.eval("var message = function(text) { task.JSMessage.message(text); };");
		} catch (ScriptException e) {
			e.printStackTrace();
		}
	}
	
	@Override
	public Object eval(String script, ScriptContext context) throws ScriptException {
		return scriptEngine.eval(script, context);
	}

	@Override
	public Object eval(Reader reader, ScriptContext context) throws ScriptException {
		return scriptEngine.eval(reader, context);
	}

	@Override
	public Object eval(String script) throws ScriptException {
		return scriptEngine.eval(script);
	}

	@Override
	public Object eval(Reader reader) throws ScriptException {
		return scriptEngine.eval(reader);
	}

	@Override
	public Object eval(String script, Bindings n) throws ScriptException {
		return scriptEngine.eval(script, n);
	}

	@Override
	public Object eval(Reader reader, Bindings n) throws ScriptException {
		return scriptEngine.eval(reader, n);
	}

	@Override
	public void put(String key, Object value) {
		scriptEngine.put(key, value);
	}

	@Override
	public Object get(String key) {
		return scriptEngine.get(key);
	}

	@Override
	public Bindings getBindings(int scope) {
		return scriptEngine.getBindings(scope);
	}

	@Override
	public void setBindings(Bindings bindings, int scope) {
		scriptEngine.setBindings(bindings, scope);
	}

	@Override
	public Bindings createBindings() {
		return scriptEngine.createBindings();
	}

	@Override
	public ScriptContext getContext() {
		return scriptEngine.getContext();
	}

	@Override
	public void setContext(ScriptContext context) {
		scriptEngine.setContext(context);
	}

	@Override
	public ScriptEngineFactory getFactory() {
		return scriptEngine.getFactory();
	}
}
