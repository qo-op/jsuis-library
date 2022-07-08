package jsuis.visitor.cmd;

import jsuis.parser.cmd.expression.JSCmdCommandExpression;
import jsuis.parser.cmd.expression.JSCmdCommandListExpression;
import jsuis.visitor.JSExpressionVisitor;

/**
 * Cmd expression visitor
 * 
 * @author Yassuo Toda
 */
public interface JSCmdExpressionVisitor<R> extends JSExpressionVisitor<R> {

	public R visitCommandExpression(JSCmdCommandExpression expression);
	public R visitCommandListExpression(JSCmdCommandListExpression expression);
}
