package jsuis.cron.visitor;

import java.util.List;

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
import jsuis.cron.parser.statement.JSCronScheduledJobStatement;
import jsuis.cron.parser.statement.JSCronStatement;
import jsuis.interpreter.parser.statement.JSStatement;

/**
 * Cron printer
 * 
 * @author Yassuo Toda
 */
public class JSCronCommandPrinter implements JSCronVisitor<String> {

	public String print(List<JSStatement> statementList) {
		int size = statementList.size();
		if (size == 0) {
			return "";
		}
		StringBuffer text = new StringBuffer();
		text.append(visitStatement((JSCronStatement) statementList.get(0), 0, Long.MAX_VALUE, 0));
		for (int i = 1; i < size; i++) {
			text.append("\n").append(visitStatement((JSCronStatement) statementList.get(i), 0, Long.MAX_VALUE, 0));
		}
		return text.toString();
	}
	
	@Override
	public String visitScheduledJobStatement(JSCronScheduledJobStatement statement, long start, long end, int size) {
		return statement.command;
	}
	
	@Override
	public String visitRebootExpression(JSCronRebootExpression expression) {
		return null;
	}
	
	@Override
	public String visitYearlyExpression(JSCronYearlyExpression expression, long start, long end, int size) {
		return null;
	}
	
	@Override
	public String visitAnnuallyExpression(JSCronAnnuallyExpression expression, long start, long end, int size) {
		return null;
	}

	@Override
	public String visitMonthlyExpression(JSCronMonthlyExpresion expression, long start, long end, int size) {
		return null;
	}

	@Override
	public String visitWeeklyExpression(JSCronWeeklyExpression expression, long start, long end, int size) {
		return null;
	}

	@Override
	public String visitDailyExpression(JSCronDailyExpression expression, long start, long end, int size) {
		return null;
	}

	@Override
	public String visitMidnightExpression(JSCronMidnightExpression expression, long start, long end, int size) {
		return null;
	}

	@Override
	public String visitHourlyExpression(JSCronHourlyExpression expression, long start, long end, int size) {
		return null;
	}

	@Override
	public String visitScheduleExpression(JSCronScheduleExpression expression, long start, long end, int size) {
		return null;
	}

	@Override
	public String visitFieldExpression(JSCronFieldExpression expression, long start, long end, int size, int months) {
		return null;
	}

	@Override
	public String visitStepExpression(JSCronStepExpression expression, long start, long end, int size, int months) {
		return null;
	}

	@Override
	public String visitAllExpression(JSCronAllExpression expression, long start, long end, int size, int months) {
		return null;
	}
	
	@Override
	public String visitRangeExpression(JSCronRangeExpression expression, long start, long end, int size, int months) {
		return null;
	}

	@Override
	public String visitNumberExpression(JSCronNumberExpression expression, long start, long end, int size, int months) {
		return null;
	}

	@Override
	public String visitDayExpression(JSCronDayExpression expression, long start, long end, int size, int months) {
		return null;
	}

	@Override
	public String visitWorkdayExpression(JSCronWorkdayExpression expression, long start, long end, int size, int months) {
		return null;
	}
	
	@Override
	public String visitDayOfWeekExpression(JSCronDayOfWeekExpression expression, long start, long end, int size, int months) {
		return null;
	}

	@Override
	public String visitOrdinalExpression(JSCronOrdinalExpression expression, long start, long end, int size, int months) {
		return null;
	}

	@Override
	public String visitStatement(JSCronStatement statement, long start, long end, int size) {
		return statement.accept(this, start, end, size);
	}

	@Override
	public String visitExpression(JSCronExpression expression, long start, long end, int size, int months) {
		return null;
	}
}
