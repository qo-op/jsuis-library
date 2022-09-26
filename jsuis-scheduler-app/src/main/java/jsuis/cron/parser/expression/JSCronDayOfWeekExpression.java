package jsuis.cron.parser.expression;

import jsuis.cron.visitor.JSCronExpressionVisitor;
import jsuis.interpreter.scanner.JSTokenType;

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
