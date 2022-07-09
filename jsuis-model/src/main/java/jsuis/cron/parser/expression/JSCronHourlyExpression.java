package jsuis.cron.parser.expression;

import jsuis.cron.visitor.JSCronExpressionVisitor;

/**
 * Cron hourly
 * 
 * @author Yassuo Toda
 */
public class JSCronHourlyExpression extends JSCronExpression {

	@Override
	public <R> R accept(JSCronExpressionVisitor<R> visitor, long start, long end, int size, int months) {
		return visitor.visitHourlyExpression(this, start, end, size);
	}
}
