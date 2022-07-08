package jsuis.parser.cron.expression;

import jsuis.parser.JSExpression;
import jsuis.parser.cron.JSCronExpression;
import jsuis.visitor.cron.JSCronExpressionVisitor;

/**
 * Cron ordinal
 * 
 * @author Yassuo Toda
 */
public class JSCronOrdinalExpression extends JSCronExpression {

	public JSExpression expression;
	public int ordinal;
	
	public JSCronOrdinalExpression(JSExpression expression, int ordinal) {
		this.expression = expression;
		this.ordinal = ordinal;
	}

	@Override
	public <R> R accept(JSCronExpressionVisitor<R> visitor, long start, long end, int size, int months) {
		return visitor.visitOrdinalExpression(this, start, end, size, months);
	}
}
