package jsuis.script.variable.parser.expression;

import java.util.List;

import javax.script.ScriptException;

import jsuis.script.variable.parser.JSVariableExpression;
import jsuis.script.variable.visitor.JSVariableExpressionVisitor;

/**
 * Variable script
 * 
 * @author Yassuo Toda
 */
public class JSVariableDollarExpression extends JSVariableExpression {

	public List<Object> list;

	public JSVariableDollarExpression(List<Object> list) {
		this.list = list;
	}

	@Override
	public <R> R accept(JSVariableExpressionVisitor<R> visitor) throws ScriptException {
		return visitor.visitDollarExpression(this);
	}
}
