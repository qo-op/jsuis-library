package jsuis.cmd.parser.expression;

import jsuis.cmd.visitor.JSCmdExpressionVisitor;
import jsuis.interpreter.parser.expression.JSExpression;

/**
 * Cron expresson
 * 
 * @author Yassuo Toda
 */
public abstract class JSCmdExpression implements JSExpression {

	public abstract <R> R accept(JSCmdExpressionVisitor<R> visitor);
}
