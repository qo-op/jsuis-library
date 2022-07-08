package jsuis.parser.variable;

import java.util.Map;

import jsuis.parser.JSExpression;
import jsuis.visitor.variable.JSVariableExpressionVisitor;

/**
 * Variable expresson
 * 
 * @author Yassuo Toda
 */
public abstract class JSVariableExpression implements JSExpression {

	public abstract <R> R accept(JSVariableExpressionVisitor<R> visitor, Map<String, String> map);
}
