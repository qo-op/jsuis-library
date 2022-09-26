package jsuis.script.variable.visitor;

import javax.script.ScriptException;

import jsuis.script.variable.parser.JSVariableExpression;
import jsuis.script.variable.parser.expression.JSVariableBlockExpression;
import jsuis.script.variable.parser.expression.JSVariableCompoundExpression;
import jsuis.script.variable.parser.expression.JSVariableDollarExpression;
import jsuis.script.variable.parser.expression.JSVariableHashExpression;

/**
 * Variable expression visitor
 * 
 * @author Yassuo Toda
 */
public interface JSVariableExpressionVisitor<R> {

	public R visitBlockExpression(JSVariableBlockExpression expression) throws ScriptException;
	public R visitCompoundExpression(JSVariableCompoundExpression expression) throws ScriptException;
	public R visitDollarExpression(JSVariableDollarExpression expression) throws ScriptException;
	public R visitHashExpression(JSVariableHashExpression expression) throws ScriptException;
	
	public R visitExpression(JSVariableExpression expression) throws ScriptException;
}
