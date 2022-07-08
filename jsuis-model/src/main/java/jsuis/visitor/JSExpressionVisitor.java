package jsuis.visitor;

import jsuis.parser.JSExpression;

/**
 * Cron expression visitor
 * 
 * @author Yassuo Toda
 */
public interface JSExpressionVisitor<R> {
	
	public R visitExpression(JSExpression expression);
}
