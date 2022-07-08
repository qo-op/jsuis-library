package jsuis.parser.cron.expression;

import jsuis.parser.cron.JSCronExpression;
import jsuis.visitor.cron.JSCronExpressionVisitor;

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
