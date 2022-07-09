package jsuis.cron.visitor;

import jsuis.cron.parser.expression.JSCronAllExpression;
import jsuis.cron.parser.expression.JSCronAnnuallyExpression;
import jsuis.cron.parser.expression.JSCronDailyExpression;
import jsuis.cron.parser.expression.JSCronDayExpression;
import jsuis.cron.parser.expression.JSCronDayOfWeekExpression;
import jsuis.cron.parser.expression.JSCronExpression;
import jsuis.cron.parser.expression.JSCronFieldExpression;
import jsuis.cron.parser.expression.JSCronHourlyExpression;
import jsuis.cron.parser.expression.JSCronMidnightExpression;
import jsuis.cron.parser.expression.JSCronMonthlyExpresion;
import jsuis.cron.parser.expression.JSCronNumberExpression;
import jsuis.cron.parser.expression.JSCronOrdinalExpression;
import jsuis.cron.parser.expression.JSCronRangeExpression;
import jsuis.cron.parser.expression.JSCronRebootExpression;
import jsuis.cron.parser.expression.JSCronScheduleExpression;
import jsuis.cron.parser.expression.JSCronStepExpression;
import jsuis.cron.parser.expression.JSCronWeeklyExpression;
import jsuis.cron.parser.expression.JSCronWorkdayExpression;
import jsuis.cron.parser.expression.JSCronYearlyExpression;

/**
 * Cron expression visitor
 * 
 * @author Yassuo Toda
 */
public interface JSCronExpressionVisitor<R> {
	
	public R visitRebootExpression(JSCronRebootExpression expression);
	public R visitYearlyExpression(JSCronYearlyExpression expression, long start, long end, int size);
	public R visitAnnuallyExpression(JSCronAnnuallyExpression expression, long start, long end, int size);
	public R visitMonthlyExpression(JSCronMonthlyExpresion expression, long start, long end, int size);
	public R visitWeeklyExpression(JSCronWeeklyExpression expression, long start, long end, int size);
	public R visitDailyExpression(JSCronDailyExpression expression, long start, long end, int size);
	public R visitMidnightExpression(JSCronMidnightExpression expression, long start, long end, int size);
	public R visitHourlyExpression(JSCronHourlyExpression expression, long start, long end, int size);
	public R visitScheduleExpression(JSCronScheduleExpression expression, long start, long end, int size);
	
	public R visitFieldExpression(JSCronFieldExpression expression, long start, long end, int size, int months);
	public R visitStepExpression(JSCronStepExpression expression, long start, long end, int size, int months);
	public R visitAllExpression(JSCronAllExpression expression, long start, long end, int size, int months);
	public R visitRangeExpression(JSCronRangeExpression expression, long start, long end, int size, int months);
	public R visitNumberExpression(JSCronNumberExpression expression, long start, long end, int size, int months);
	public R visitDayExpression(JSCronDayExpression expression, long start, long end, int size, int months);
	public R visitWorkdayExpression(JSCronWorkdayExpression expression, long start, long end, int size, int months);
	public R visitDayOfWeekExpression(JSCronDayOfWeekExpression expression, long start, long end, int size, int months);
	public R visitOrdinalExpression(JSCronOrdinalExpression expression, long start, long end, int size, int months);
	
	public R visitExpression(JSCronExpression expression, long start, long end, int size, int months);
}
