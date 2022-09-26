package jsuis.cron.parser.expression;

import jsuis.cron.visitor.JSCronExpressionVisitor;

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
