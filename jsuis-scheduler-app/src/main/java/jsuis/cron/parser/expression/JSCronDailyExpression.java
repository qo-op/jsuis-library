package jsuis.cron.parser.expression;

import jsuis.cron.visitor.JSCronExpressionVisitor;

/**
 * Cron daily
 * 
 * @author Yassuo Toda
 */
public class JSCronDailyExpression extends JSCronExpression {

	@Override
	public <R> R accept(JSCronExpressionVisitor<R> visitor, long start, long end, int size, int months) {
		return visitor.visitDailyExpression(this, start, end, size);
	}
}
