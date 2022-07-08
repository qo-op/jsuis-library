package jsuis.visitor.cron;

import java.util.ArrayList;
import java.util.List;

import jsuis.parser.JSExpression;
import jsuis.parser.JSStatement;
import jsuis.parser.cron.JSCronExpression;
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
			list.addAll(visitStatement(statement));
		}
		return list;
	}
	
	@Override
	public List<String> visitScheduledJobStatement(JSCronScheduledJobStatement statement, long start, long end, int size) {
		List<String> list = new ArrayList<>();
		if (statement.expression != null) {
			list.addAll(visitExpression(statement.expression));
		}
		list.add(statement.command);
		return list;
	}

	@Override
	public List<String> visitRebootExpression(JSCronRebootExpression expression) {
		List<String> list = new ArrayList<>();
		list.add(cronPrinter.visitExpression(expression));
		return list;
	}

	@Override
	public List<String> visitYearlyExpression(JSCronYearlyExpression expression, long start, long end, int size) {
		List<String> list = new ArrayList<>();
		list.add(cronPrinter.visitExpression(expression));
		return list;
	}

	@Override
	public List<String> visitAnnuallyExpression(JSCronAnnuallyExpression expression, long start, long end, int size) {
		List<String> list = new ArrayList<>();
		list.add(cronPrinter.visitExpression(expression));
		return list;
	}

	@Override
	public List<String> visitMonthlyExpression(JSCronMonthlyExpresion expression, long start, long end, int size) {
		List<String> list = new ArrayList<>();
		list.add(cronPrinter.visitExpression(expression));
		return list;
	}

	@Override
	public List<String> visitWeeklyExpression(JSCronWeeklyExpression expression, long start, long end, int size) {
		List<String> list = new ArrayList<>();
		list.add(cronPrinter.visitExpression(expression));
		return list;
	}

	@Override
	public List<String> visitDailyExpression(JSCronDailyExpression expression, long start, long end, int size) {
		List<String> list = new ArrayList<>();
		list.add(cronPrinter.visitExpression(expression));
		return list;
	}

	@Override
	public List<String> visitMidnightExpression(JSCronMidnightExpression expression, long start, long end, int size) {
		List<String> list = new ArrayList<>();
		list.add(cronPrinter.visitExpression(expression));
		return list;
	}

	@Override
	public List<String> visitHourlyExpression(JSCronHourlyExpression expression, long start, long end, int size) {
		List<String> list = new ArrayList<>();
		list.add(cronPrinter.visitExpression(expression));
		return list;
	}

	@Override
	public List<String> visitScheduleExpression(JSCronScheduleExpression expression, long start, long end, int size) {
		List<String> list = new ArrayList<>();
		list.add(cronPrinter.visitExpression(expression.minuteExpression));
		list.add(cronPrinter.visitExpression(expression.hourExpression));
		list.add(cronPrinter.visitExpression(expression.dayOfMonthExpression));
		list.add(cronPrinter.visitExpression(expression.monthExpression));
		list.add(cronPrinter.visitExpression(expression.dayOfWeekExpression));
		list.add(expression.yearExpression != null ? cronPrinter.visitExpression(expression.yearExpression) : "");
		return list;
	}
	
	@Override
	public List<String> visitListExpression(JSCronListExpression expression, long start, long end, int size, int months) {
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
	public List<String> visitStatement(JSStatement statement) {
		return visitStatement(statement, 0, Long.MAX_VALUE, 0);
	}

	@Override
	public List<String> visitStatement(JSStatement statement, long start, long end, int size) {
		return ((JSCronStatement) statement).accept(this, start, end, size);
	}

	@Override
	public List<String> visitExpression(JSExpression expression) {
		return visitExpression(expression, 0, Long.MAX_VALUE, 0, 0);
	}

	@Override
	public List<String> visitExpression(JSExpression expression, long start, long end, int size, int months) {
		return ((JSCronExpression) expression).accept(this, start, end, size, months);
	}
}
