package jsuis.script.variable.parser;

import javax.script.ScriptException;

import jsuis.interpreter.parser.expression.JSExpression;
import jsuis.script.variable.visitor.JSVariableExpressionVisitor;

/**
 * Variable expresson
 * 
 * @author Yassuo Toda
 */
public abstract class JSVariableExpression implements JSExpression {

	public abstract <R> R accept(JSVariableExpressionVisitor<R> visitor) throws ScriptException;
}
