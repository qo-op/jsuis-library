package jsuis.parser.variable.expression;

import java.util.List;
import java.util.Map;

import jsuis.parser.variable.JSVariableExpression;
import jsuis.visitor.variable.JSVariableExpressionVisitor;

/**
 * Variable script
 * 
 * @author Yassuo Toda
 */
public class JSVariableBlockExpression extends JSVariableExpression {

	public List<Object> list;

	public JSVariableBlockExpression(List<Object> list) {
		this.list = list;
	}

	@Override
	public <R> R accept(JSVariableExpressionVisitor<R> visitor, Map<String, String> map) {
		return visitor.visitBlockExpression(this, map);
	}
}
