package jsuis.parser.cron.expression;

import jsuis.parser.cron.JSCronExpression;
import jsuis.visitor.cron.JSCronExpressionVisitor;

/**
 * Cron weekly
 * 
 * @author Yassuo Toda
 */
public class JSCronWeeklyExpression extends JSCronExpression {

	@Override
	public <R> R accept(JSCronExpressionVisitor<R> visitor, long start, long end, int size, int months) {
		return visitor.visitWeeklyExpression(this, start, end, size);
	}
}
