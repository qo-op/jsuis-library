package jsuis.visitor.variable;

import java.util.List;
import java.util.Map;

import jsuis.parser.JSExpression;
import jsuis.parser.JSStatement;
import jsuis.parser.variable.JSVariableExpression;
import jsuis.parser.variable.JSVariableStatement;
import jsuis.parser.variable.expression.JSVariableBlockExpression;
import jsuis.parser.variable.expression.JSVariableCompoundExpression;
import jsuis.parser.variable.expression.JSVariableScriptExpression;
import jsuis.parser.variable.statement.JSVariableLineStatement;

/**
 * Variable printer
 * 
 * @author Yassuo Toda
 */
public class JSVariablePrinter implements JSVariableVisitor<String> {

	public String print(List<JSStatement> statementList, Map<String, String> map) {
		int size = statementList.size();
		if (size == 0) {
			return "";
		}
		StringBuffer text = new StringBuffer();
		text.append(visitStatement(statementList.get(0), map));
		for (int i = 1; i < size; i++) {
			text.append("\n").append(visitStatement(statementList.get(i), map));
		}
		return text.toString();
	}
	
	@Override
	public String visitLineStatement(JSVariableLineStatement statement, Map<String, String> map) {
		if (statement.left.isEmpty() && statement.expressionList.size() == 1) {
			JSExpression expression = statement.expressionList.get(0);
			return visitExpression(expression, map);
		} else {
			StringBuffer text = new StringBuffer();
			text.append(statement.left);
			for (JSExpression expression : statement.expressionList) {
				text.append(visitExpression(expression, map));
			}
			return text.toString();
		}
	}

	@Override
	public String visitCompoundExpression(JSVariableCompoundExpression expression, Map<String, String> map) {
		if (expression.right.isEmpty()) {
			return visitExpression(expression.script, map);
		} else {
			StringBuffer text = new StringBuffer();
			text.append(visitExpression(expression.script, map));
			text.append(expression.right);
			return text.toString();
		}
	}

	@Override
	public String visitScriptExpression(JSVariableScriptExpression expression, Map<String, String> map) {
		StringBuffer text = new StringBuffer();
		for (Object object : expression.list) {
			if (object instanceof JSExpression) {
				text.append(visitExpression((JSExpression) object, map));
			} else {
				text.append(object);
			}
		}
		return map.get(text.toString());
	}
	
	@Override
	public String visitBlockExpression(JSVariableBlockExpression expression, Map<String, String> map) {
		StringBuffer text = new StringBuffer();
		text.append("{");
		for (Object object : expression.list) {
			if (object instanceof JSExpression) {
				text.append(visitExpression((JSExpression) object, map));
			} else {
				text.append(object);
			}
		}
		text.append("}");
		return text.toString();
	}

	@Override
	public String visitStatement(JSStatement statement) {
		return ((JSVariableStatement) statement).accept(this, null);
	}

	@Override
	public String visitStatement(JSStatement statement, Map<String, String> map) {
		return ((JSVariableStatement) statement).accept(this, map);
	}

	@Override
	public String visitExpression(JSExpression expression) {
		return ((JSVariableExpression) expression).accept(this, null);
	}

	@Override
	public String visitExpression(JSExpression expression, Map<String, String> map) {
		return ((JSVariableExpression) expression).accept(this, map);
	}
}
