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
public class JSVariableHashExpression extends JSVariableExpression {

	public List<Object> list;

	public JSVariableHashExpression(List<Object> list) {
		this.list = list;
	}

	@Override
	public <R> R accept(JSVariableExpressionVisitor<R> visitor) throws ScriptException {
		return visitor.visitHashExpression(this);
	}
}
