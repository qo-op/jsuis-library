package jsuis.visitor.cron;

import jsuis.parser.JSExpression;
import jsuis.parser.cron.expression.JSCronAllExpression;
import jsuis.parser.cron.expression.JSCronAnnuallyExpression;
import jsuis.parser.cron.expression.JSCronDailyExpression;
import jsuis.parser.cron.expression.JSCronDayExpression;
import jsuis.parser.cron.expression.JSCronDayOfWeekExpression;
import jsuis.parser.cron.expression.JSCronHourlyExpression;
import jsuis.parser.cron.expression.JSCronListExpression;
import jsuis.parser.cron.expression.JSCronMidnightExpression;
import jsuis.parser.cron.expression.JSCronMonthlyExpresion;
import jsuis.parser.cron.expression.JSCronNumberExpression;
import jsuis.parser.cron.expression.JSCronOrdinalExpression;
import jsuis.parser.cron.expression.JSCronRangeExpression;
import jsuis.parser.cron.expression.JSCronRebootExpression;
import jsuis.parser.cron.expression.JSCronScheduleExpression;
import jsuis.parser.cron.expression.JSCronStepExpression;
import jsuis.parser.cron.expression.JSCronWeeklyExpression;
import jsuis.parser.cron.expression.JSCronWorkdayExpression;
import jsuis.parser.cron.expression.JSCronYearlyExpression;
import jsuis.visitor.JSExpressionVisitor;

/**
 * Cron expression visitor
 * 
 * @author Yassuo Toda
 */
public interface JSCronExpressionVisitor<R> extends JSExpressionVisitor<R> {
	
	public R visitRebootExpression(JSCronRebootExpression expression);
	public R visitYearlyExpression(JSCronYearlyExpression expression, long start, long end, int size);
	public R visitAnnuallyExpression(JSCronAnnuallyExpression expression, long start, long end, int size);
	public R visitMonthlyExpression(JSCronMonthlyExpresion expression, long start, long end, int size);
	public R visitWeeklyExpression(JSCronWeeklyExpression expression, long start, long end, int size);
	public R visitDailyExpression(JSCronDailyExpression expression, long start, long end, int size);
	public R visitMidnightExpression(JSCronMidnightExpression expression, long start, long end, int size);
	public R visitHourlyExpression(JSCronHourlyExpression expression, long start, long end, int size);
	public R visitScheduleExpression(JSCronScheduleExpression expression, long start, long end, int size);
	
	public R visitListExpression(JSCronListExpression expression, long start, long end, int size, int months);
	public R visitStepExpression(JSCronStepExpression expression, long start, long end, int size, int months);
	public R visitAllExpression(JSCronAllExpression expression, long start, long end, int size, int months);
	public R visitRangeExpression(JSCronRangeExpression expression, long start, long end, int size, int months);
	public R visitNumberExpression(JSCronNumberExpression expression, long start, long end, int size, int months);
	public R visitDayExpression(JSCronDayExpression expression, long start, long end, int size, int months);
	public R visitWorkdayExpression(JSCronWorkdayExpression expression, long start, long end, int size, int months);
	public R visitDayOfWeekExpression(JSCronDayOfWeekExpression expression, long start, long end, int size, int months);
	public R visitOrdinalExpression(JSCronOrdinalExpression expression, long start, long end, int size, int months);
	
	public R visitExpression(JSExpression expression, long start, long end, int size, int months);
}
