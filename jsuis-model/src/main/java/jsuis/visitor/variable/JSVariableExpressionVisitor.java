package jsuis.visitor.variable;

import java.util.Map;

import jsuis.parser.JSExpression;
import jsuis.parser.variable.expression.JSVariableBlockExpression;
import jsuis.parser.variable.expression.JSVariableCompoundExpression;
import jsuis.parser.variable.expression.JSVariableScriptExpression;
import jsuis.visitor.JSExpressionVisitor;

/**
 * Variable expression visitor
 * 
 * @author Yassuo Toda
 */
public interface JSVariableExpressionVisitor<R> extends JSExpressionVisitor<R> {

	public R visitScriptExpression(JSVariableScriptExpression expression, Map<String, String> map);
	public R visitBlockExpression(JSVariableBlockExpression expression, Map<String, String> map);
	public R visitCompoundExpression(JSVariableCompoundExpression expression, Map<String, String> map);
	
	public R visitExpression(JSExpression expression, Map<String, String> map);
}
