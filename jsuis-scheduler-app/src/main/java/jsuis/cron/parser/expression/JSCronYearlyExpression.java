package jsuis.cron.parser.expression;

import jsuis.cron.visitor.JSCronExpressionVisitor;

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
