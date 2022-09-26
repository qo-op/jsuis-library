package jsuis.cron.parser.expression;

import jsuis.cron.visitor.JSCronExpressionVisitor;

/**
 * Cron midnight
 * 
 * @author Yassuo Toda
 */
public class JSCronMidnightExpression extends JSCronExpression {

	@Override
	public <R> R accept(JSCronExpressionVisitor<R> visitor, long start, long end, int size, int months) {
		return visitor.visitMidnightExpression(this, start, end, size);
	}
}
