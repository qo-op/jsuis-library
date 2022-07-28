package jsuis.script.variable.parser.expression;

import javax.script.ScriptException;

import jsuis.interpreter.parser.expression.JSExpression;
import jsuis.script.variable.parser.JSVariableExpression;
import jsuis.script.variable.visitor.JSVariableExpressionVisitor;

/**
 * Variable script
 * 
 * @author Yassuo Toda
 */
public class JSVariableCompoundExpression extends JSVariableExpression {

	public JSExpression expression;
	public String right;
	
	public JSVariableCompoundExpression(JSExpression expression, String right) {
		this.expression = expression;
		this.right = right;
	}

	@Override
	public <R> R accept(JSVariableExpressionVisitor<R> visitor) throws ScriptException {
		return visitor.visitCompoundExpression(this);
	}
}
