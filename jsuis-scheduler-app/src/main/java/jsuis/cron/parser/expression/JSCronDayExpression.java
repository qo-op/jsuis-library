package jsuis.cron.parser.expression;

import jsuis.cron.visitor.JSCronExpressionVisitor;
import jsuis.interpreter.parser.expression.JSExpression;

/**
 * Cron day
 * 
 * @author Yassuo Toda
 */
public class JSCronDayExpression extends JSCronExpression {

	public JSExpression expression;
	public int offset;
	public String prefix;
	
	public JSCronDayExpression(JSExpression expression, int offset) {
		this(expression, offset, "");
	}
	
	public JSCronDayExpression(JSExpression expression, int offset, String prefix) {
		this.expression = expression;
		this.offset = offset;
		this.prefix = prefix;
	}

	@Override
	public <R> R accept(JSCronExpressionVisitor<R> visitor, long start, long end, int size, int months) {
		return visitor.visitDayExpression(this, start, end, size, months);
	}
}
