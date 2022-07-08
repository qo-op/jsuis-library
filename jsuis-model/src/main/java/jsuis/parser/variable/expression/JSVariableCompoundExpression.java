package jsuis.parser.variable.expression;

import java.util.Map;

import jsuis.parser.JSExpression;
import jsuis.parser.variable.JSVariableExpression;
import jsuis.visitor.variable.JSVariableExpressionVisitor;

/**
 * Variable script
 * 
 * @author Yassuo Toda
 */
public class JSVariableCompoundExpression extends JSVariableExpression {

	public JSExpression script;
	public String right;
	
	public JSVariableCompoundExpression(JSExpression script, String right) {
		this.script = script;
		this.right = right;
	}

	@Override
	public <R> R accept(JSVariableExpressionVisitor<R> visitor, Map<String, String> map) {
		return visitor.visitCompoundExpression(this, map);
	}
}
