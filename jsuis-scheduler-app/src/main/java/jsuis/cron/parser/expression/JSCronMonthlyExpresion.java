package jsuis.cron.parser.expression;

import jsuis.cron.visitor.JSCronExpressionVisitor;

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
