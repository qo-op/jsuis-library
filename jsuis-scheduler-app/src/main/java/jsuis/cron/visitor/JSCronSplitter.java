package jsuis.cron.visitor;

import java.util.ArrayList;
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
 * Cron splitter
 * 
 * @author Yassuo Toda
 */
public class JSCronSplitter implements JSCronVisitor<List<String>> {

	private JSCronVisitor<String> cronPrinter;
	
	public JSCronSplitter(JSCronVisitor<String> cronPrinter) {
		this.cronPrinter = cronPrinter;
	}
	
	public List<String> split(List<JSStatement> statementList) {
		List<String> list = new ArrayList<>();
		for (JSStatement statement : statementList) {
			list.addAll(visitStatement((JSCronStatement) statement, 0, Long.MAX_VALUE, 0));
		}
		return list;
	}
	
	@Override
	public List<String> visitScheduledJobStatement(JSCronScheduledJobStatement statement, long start, long end, int size) {
		List<String> list = new ArrayList<>();
		if (statement.expression != null) {
			list.addAll(visitExpression((JSCronExpression) statement.expression, start, end, size, 0));
		}
		list.add(statement.command);
		return list;
	}

	@Override
	public List<String> visitRebootExpression(JSCronRebootExpression expression) {
		List<String> list = new ArrayList<>();
		list.add(cronPrinter.visitExpression(expression, 0, Long.MAX_VALUE, 0, 0));
		return list;
	}

	@Override
	public List<String> visitYearlyExpression(JSCronYearlyExpression expression, long start, long end, int size) {
		List<String> list = new ArrayList<>();
		list.add(cronPrinter.visitExpression(expression, start, end, size, 0));
		return list;
	}

	@Override
	public List<String> visitAnnuallyExpression(JSCronAnnuallyExpression expression, long start, long end, int size) {
		List<String> list = new ArrayList<>();
		list.add(cronPrinter.visitExpression(expression, start, end, size, 0));
		return list;
	}

	@Override
	public List<String> visitMonthlyExpression(JSCronMonthlyExpresion expression, long start, long end, int size) {
		List<String> list = new ArrayList<>();
		list.add(cronPrinter.visitExpression(expression, start, end, size, 0));
		return list;
	}

	@Override
	public List<String> visitWeeklyExpression(JSCronWeeklyExpression expression, long start, long end, int size) {
		List<String> list = new ArrayList<>();
		list.add(cronPrinter.visitExpression(expression, start, end, size, 0));
		return list;
	}

	@Override
	public List<String> visitDailyExpression(JSCronDailyExpression expression, long start, long end, int size) {
		List<String> list = new ArrayList<>();
		list.add(cronPrinter.visitExpression(expression, start, end, size, 0));
		return list;
	}

	@Override
	public List<String> visitMidnightExpression(JSCronMidnightExpression expression, long start, long end, int size) {
		List<String> list = new ArrayList<>();
		list.add(cronPrinter.visitExpression(expression, start, end, size, 0));
		return list;
	}

	@Override
	public List<String> visitHourlyExpression(JSCronHourlyExpression expression, long start, long end, int size) {
		List<String> list = new ArrayList<>();
		list.add(cronPrinter.visitExpression(expression, start, end, size, 0));
		return list;
	}

	@Override
	public List<String> visitScheduleExpression(JSCronScheduleExpression expression, long start, long end, int size) {
		List<String> list = new ArrayList<>();
		list.add(cronPrinter.visitExpression((JSCronExpression) expression.minuteExpression, start, end, size, 0));
		list.add(cronPrinter.visitExpression((JSCronExpression) expression.hourExpression, start, end, size, 0));
		list.add(cronPrinter.visitExpression((JSCronExpression) expression.dayOfMonthExpression, start, end, size, 0));
		list.add(cronPrinter.visitExpression((JSCronExpression) expression.monthExpression, start, end, size, 0));
		list.add(cronPrinter.visitExpression((JSCronExpression) expression.dayOfWeekExpression, start, end, size, 0));
		list.add(expression.yearExpression != null ? cronPrinter.visitExpression((JSCronExpression) expression.yearExpression, start, end, size, 0) : "");
		return list;
	}
	
	@Override
	public List<String> visitFieldExpression(JSCronFieldExpression expression, long start, long end, int size, int months) {
		return null;
	}

	@Override
	public List<String> visitStepExpression(JSCronStepExpression expression, long start, long end, int size, int months) {
		return null;
	}

	@Override
	public List<String> visitAllExpression(JSCronAllExpression expression, long start, long end, int size, int months) {
		return null;
	}

	@Override
	public List<String> visitRangeExpression(JSCronRangeExpression expression, long start, long end, int size, int months) {
		return null;
	}

	@Override
	public List<String> visitNumberExpression(JSCronNumberExpression expression, long start, long end, int size, int months) {
		return null;
	}

	@Override
	public List<String> visitDayExpression(JSCronDayExpression expression, long start, long end, int size, int months) {
		return null;
	}

	@Override
	public List<String> visitWorkdayExpression(JSCronWorkdayExpression expression, long start, long end, int size, int months) {
		return null;
	}

	@Override
	public List<String> visitDayOfWeekExpression(JSCronDayOfWeekExpression expression, long start, long end, int size, int months) {
		return null;
	}

	@Override
	public List<String> visitOrdinalExpression(JSCronOrdinalExpression expression, long start, long end, int size, int months) {
		return null;
	}

	@Override
	public List<String> visitStatement(JSCronStatement statement, long start, long end, int size) {
		return statement.accept(this, start, end, size);
	}

	@Override
	public List<String> visitExpression(JSCronExpression expression, long start, long end, int size, int months) {
		return expression.accept(this, start, end, size, months);
	}
}
