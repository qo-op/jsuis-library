package jsuis.visitor.cron;

import java.util.List;

import jsuis.parser.JSExpression;
import jsuis.parser.JSStatement;
import jsuis.parser.cron.JSCronStatement;
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
import jsuis.parser.cron.statement.JSCronScheduledJobStatement;

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
		text.append(visitStatement(statementList.get(0)));
		for (int i = 1; i < size; i++) {
			text.append("\n").append(visitStatement(statementList.get(i)));
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
	public String visitListExpression(JSCronListExpression expression, long start, long end, int size, int months) {
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
	public String visitStatement(JSStatement statement) {
		return visitStatement(statement, 0, Long.MAX_VALUE, 0);
	}

	@Override
	public String visitStatement(JSStatement statement, long start, long end, int size) {
		return ((JSCronStatement) statement).accept(this, start, end, size);
	}

	@Override
	public String visitExpression(JSExpression expression) {
		return null;
	}

	@Override
	public String visitExpression(JSExpression expression, long start, long end, int size, int months) {
		return null;
	}
}
