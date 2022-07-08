package jsuis.parser.cron.expression;

import jsuis.parser.cron.JSCronExpression;
import jsuis.scanner.JSTokenType;
import jsuis.visitor.cron.JSCronExpressionVisitor;

/**
 * Cron day of week
 * 
 * @author Yassuo Toda
 */
public class JSCronDayOfWeekExpression extends JSCronExpression {

	public JSTokenType tokenType;
	
	public JSCronDayOfWeekExpression(JSTokenType tokenType) {
		this.tokenType = tokenType;
	}

	@Override
	public <R> R accept(JSCronExpressionVisitor<R> visitor, long start, long end, int size, int months) {
		return visitor.visitDayOfWeekExpression(this, start, end, size, months);
	}
}
