package jsuis.cmd.visitor;

import jsuis.cmd.parser.expression.JSCmdCommandExpression;
import jsuis.cmd.parser.expression.JSCmdExpression;
import jsuis.cmd.parser.expression.JSCmdTextExpression;

/**
 * Cmd expression visitor
 * 
 * @author Yassuo Toda
 */
public interface JSCmdExpressionVisitor<R> {

	public R visitTextExpression(JSCmdTextExpression expression);
	public R visitCommandExpression(JSCmdCommandExpression expression);
	
	public R visitExpression(JSCmdExpression expression);
}
