package jsuis.parser.cron.expression;

import jsuis.parser.cron.JSCronExpression;
import jsuis.visitor.cron.JSCronExpressionVisitor;

/**
 * Cron monthly
 * 
 * @author Yassuo Toda
 */
public class JSCronMonthlyExpresion extends JSCronExpression {

	@Override
	public <R> R accept(JSCronExpressionVisitor<R> visitor, long start, long end, int size, int months) {
		return visitor.visitMonthlyExpression(this, start, end, size);
	}
}
