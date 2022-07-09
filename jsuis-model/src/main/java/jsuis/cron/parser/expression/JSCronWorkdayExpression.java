package jsuis.cron.parser.expression;

import jsuis.cron.visitor.JSCronExpressionVisitor;
import jsuis.interpreter.parser.expression.JSExpression;

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
