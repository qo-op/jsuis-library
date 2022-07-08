package jsuis.parser.cron.expression;

import jsuis.parser.JSExpression;
import jsuis.parser.cron.JSCronExpression;
import jsuis.visitor.cron.JSCronExpressionVisitor;

/**
 * Cron workday
 * 
 * @author Yassuo Toda
 */
public class JSCronWorkdayExpression extends JSCronExpression {

	public JSExpression expression;
	public int offset;
	
	public JSCronWorkdayExpression(JSExpression expression, int offset) {
		this.expression = expression;
		this.offset = offset;
	}

	@Override
	public <R> R accept(JSCronExpressionVisitor<R> visitor, long start, long end, int size, int months) {
		return visitor.visitWorkdayExpression(this, start, end, size, months);
	}
}
