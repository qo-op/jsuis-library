package jsuis.parser.cron.expression;

import jsuis.parser.cron.JSCronExpression;
import jsuis.visitor.cron.JSCronExpressionVisitor;

/**
 * Cron yearly
 * 
 * @author Yassuo Toda
 */
public class JSCronYearlyExpression extends JSCronExpression {

	@Override
	public <R> R accept(JSCronExpressionVisitor<R> visitor, long start, long end, int size, int months) {
		return visitor.visitYearlyExpression(this, start, end, size);
	}
}
