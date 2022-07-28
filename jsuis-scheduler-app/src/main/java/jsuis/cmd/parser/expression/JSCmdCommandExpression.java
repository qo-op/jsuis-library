package jsuis.cmd.parser.expression;

import java.util.List;

import jsuis.cmd.visitor.JSCmdExpressionVisitor;
import jsuis.interpreter.parser.expression.JSExpression;

/**
 * Cmd command expression
 * 
 * @author Yassuo Toda
 */
public class JSCmdCommandExpression extends JSCmdExpression {

	public List<JSExpression> textExpressionList;
	
	public JSCmdCommandExpression(List<JSExpression> textExpressionList) {
		this.textExpressionList = textExpressionList;
	}

	@Override
	public <R> R accept(JSCmdExpressionVisitor<R> visitor) {
		return visitor.visitCommandExpression(this);
	}
}
