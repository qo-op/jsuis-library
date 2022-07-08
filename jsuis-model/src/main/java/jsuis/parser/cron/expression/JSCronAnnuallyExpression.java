package jsuis.parser.cron.expression;

import jsuis.parser.cron.JSCronExpression;
import jsuis.visitor.cron.JSCronExpressionVisitor;

/**
 * Cron annually
 * 
 * @author Yassuo Toda
 */
public class JSCronAnnuallyExpression extends JSCronExpression {

	@Override
	public <R> R accept(JSCronExpressionVisitor<R> visitor, long start, long end, int size, int months) {
		return visitor.visitAnnuallyExpression(this, start, end, size);
	}
}
