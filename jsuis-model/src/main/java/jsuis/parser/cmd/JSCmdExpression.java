package jsuis.parser.cmd;

import jsuis.parser.JSExpression;
import jsuis.visitor.cmd.JSCmdExpressionVisitor;

/**
 * Cron expresson
 * 
 * @author Yassuo Toda
 */
public abstract class JSCmdExpression implements JSExpression {

	public abstract <R> R accept(JSCmdExpressionVisitor<R> visitor);
}
