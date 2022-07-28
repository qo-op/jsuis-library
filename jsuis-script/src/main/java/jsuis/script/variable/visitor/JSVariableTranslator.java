package jsuis.script.variable.visitor;

import java.util.ArrayList;
import java.util.List;

import javax.script.Bindings;
import javax.script.ScriptEngine;
import javax.script.ScriptException;

import jsuis.interpreter.parser.expression.JSExpression;
import jsuis.interpreter.parser.statement.JSStatement;
import jsuis.interpreter.scanner.JSToken;
import jsuis.script.engine.JSScriptEngine;
import jsuis.script.variable.parser.JSVariableExpression;
import jsuis.script.variable.parser.JSVariableParser;
import jsuis.script.variable.parser.JSVariableStatement;
import jsuis.script.variable.parser.expression.JSVariableBlockExpression;
import jsuis.script.variable.parser.expression.JSVariableCompoundExpression;
import jsuis.script.variable.parser.expression.JSVariableDollarExpression;
import jsuis.script.variable.parser.expression.JSVariableHashExpression;
import jsuis.script.variable.parser.statement.JSVariableLineStatement;
import jsuis.script.variable.scanner.JSVariableScanner;

/**
 * Variable translator
 * 
 * @author Yassuo Toda
 */
public class JSVariableTranslator implements JSVariableVisitor<Object> {

	private Bindings bindings;
	
	public JSVariableTranslator(Bindings bindings) {
		this.bindings = bindings;
	}
	
	public Object translate(String value) throws ScriptException {
		if (value == null) {
			return null;
		}
		JSVariableScanner variableScanner = new JSVariableScanner(value);
		List<JSToken> tokenList = variableScanner.scan();
		JSVariableParser variableParser = new JSVariableParser(tokenList);
		List<JSStatement> statementList = variableParser.parse();
		int size = statementList.size();
		switch (size) {
		case 0:
			return "";
		case 1:
			return visitStatement((JSVariableLineStatement) statementList.get(0));
		default:
			return translate(statementList);
		}
	}
	
	public Object translate(List<JSStatement> statementList) throws ScriptException {
		List<Object> objectList = new ArrayList<>();
		for (JSStatement statement : statementList) {
			objectList.add(visitStatement((JSVariableLineStatement) statement));
		}
		StringBuffer text = new StringBuffer();
		text.append(objectList.get(0));
		int size = objectList.size();
		for (int i = 1; i < size; i++) {
			text.append(System.lineSeparator()).append(objectList.get(i));
		}
		return text.toString();
	}
	
	@Override
	public Object visitLineStatement(JSVariableLineStatement statement) throws ScriptException {
		boolean instanceofString = false;
		List<Object> objectList = new ArrayList<>();
		for (JSExpression expression : statement.expressionList) {
			Object object = visitExpression((JSVariableExpression) expression);
			if (object instanceof String) {
				instanceofString = true;
			}
			objectList.add(object);
		}
		if (instanceofString || !statement.left.isEmpty()) {
			StringBuffer text = new StringBuffer();
			text.append(statement.left);
			for (Object object : objectList) {
				text.append(object);
			}
			return text.toString();
		}
		int size = objectList.size();
		switch (size) {
		case 0:
			return null;
		case 1:
			return objectList.get(0);
		default:
			return objectList;
		}
	}

	@Override
	public Object visitCompoundExpression(JSVariableCompoundExpression expression) throws ScriptException {
		if (expression.right.isEmpty()) {
			return visitExpression((JSVariableExpression) expression.expression);
		} else {
			StringBuffer text = new StringBuffer();
			text.append(visitExpression((JSVariableExpression) expression.expression));
			text.append(expression.right);
			return text.toString();
		}
	}

	@Override
	public Object visitDollarExpression(JSVariableDollarExpression expression) throws ScriptException {
		StringBuffer text = new StringBuffer();
		for (Object object : expression.list) {
			if (object instanceof JSExpression) {
				text.append(visitExpression((JSVariableExpression) object));
			} else {
				text.append(object);
			}
		}
		String key = text.toString();
		if (bindings.containsKey(key)) {
			return bindings.get(key);
		} else {
			return "${" + key + "}";
		}
	}

	@Override
	public Object visitHashExpression(JSVariableHashExpression expression) throws ScriptException {
		StringBuffer text = new StringBuffer();
		for (Object object : expression.list) {
			if (object instanceof JSExpression) {
				text.append(visitExpression((JSVariableExpression) object));
			} else {
				text.append(object);
			}
		}
		try {
			ScriptEngine scriptEngine = JSScriptEngine.getInstance();
			return scriptEngine.eval(text.toString(), bindings);
		} catch (ScriptException e) {
			return null;
		}
	}
	
	@Override
	public Object visitBlockExpression(JSVariableBlockExpression expression) throws ScriptException {
		StringBuffer text = new StringBuffer();
		for (Object object : expression.list) {
			if (object instanceof JSExpression) {
				text.append(visitExpression((JSVariableExpression) object));
			} else {
				text.append(object);
			}
		}
		return "{" + text.toString() + "}";
	}

	@Override
	public Object visitStatement(JSVariableLineStatement statement) throws ScriptException {
		return ((JSVariableStatement) statement).accept(this);
	}

	@Override
	public Object visitExpression(JSVariableExpression expression) throws ScriptException {
		return ((JSVariableExpression) expression).accept(this);
	}
}
