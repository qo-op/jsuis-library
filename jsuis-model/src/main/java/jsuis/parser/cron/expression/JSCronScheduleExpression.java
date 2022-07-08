package jsuis.parser.cron.expression;

import jsuis.parser.JSExpression;
import jsuis.parser.cron.JSCronExpression;
import jsuis.visitor.cron.JSCronExpressionVisitor;

/**
 * Cron schedule
 * 
 * @author Yassuo Toda
 */
public class JSCronScheduleExpression extends JSCronExpression {

	public JSExpression minuteExpression;
	public JSExpression hourExpression;
	public JSExpression dayOfMonthExpression;
	public JSExpression monthExpression;
	public JSExpression dayOfWeekExpression;
	public JSExpression yearExpression;
	
	public JSCronScheduleExpression(
			JSExpression minuteExpression,
			JSExpression hourExpression,
			JSExpression dayOfMonthExpression,
			JSExpression monthExpression,
			JSExpression dayOfWeekExpression,
			JSExpression yearExpression) {
		
		this.minuteExpression = minuteExpression;
		this.hourExpression = hourExpression;
		this.dayOfMonthExpression = dayOfMonthExpression;
		this.monthExpression = monthExpression;
		this.dayOfWeekExpression = dayOfWeekExpression;
		this.yearExpression = yearExpression;
	}
	
	@Override
	public <R> R accept(JSCronExpressionVisitor<R> visitor, long start, long end, int size, int months) {
		return visitor.visitScheduleExpression(this, start, end, size);
	}
}
