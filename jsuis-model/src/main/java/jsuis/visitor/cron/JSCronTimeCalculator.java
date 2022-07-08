package jsuis.visitor.cron;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.TreeSet;

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

public abstract class JSCronTimeCalculator implements JSCronVisitor<List<Integer>> {
	
	public Set<Integer> calculate(List<JSStatement> statementList) {
		TreeSet<Integer> set = new TreeSet<>();
		for (JSStatement statement : statementList) {
			set.addAll(visitStatement(statement));
		}
		return set;
	}

	@Override
	public List<Integer> visitScheduledJobStatement(JSCronScheduledJobStatement statement, long start, long end, int size) {
		if (statement.expression != null) {
			return visitExpression(statement.expression);
		}
		return new ArrayList<>();
	}

	@Override
	public List<Integer> visitRebootExpression(JSCronRebootExpression expression) {
		return new ArrayList<>();
	}

	@Override
	public List<Integer> visitYearlyExpression(JSCronYearlyExpression expression, long start, long end, int size) {
		return visitAnnuallyExpression(null, start, end, size);
	}

	@Override
	public List<Integer> visitAnnuallyExpression(JSCronAnnuallyExpression expression, long start, long end, int size) {
		return Arrays.asList(0);
	}

	@Override
	public List<Integer> visitMonthlyExpression(JSCronMonthlyExpresion expression, long start, long end, int size) {
		return Arrays.asList(0);
	}

	@Override
	public List<Integer> visitWeeklyExpression(JSCronWeeklyExpression expression, long start, long end, int size) {
		return Arrays.asList(0);
	}

	@Override
	public List<Integer> visitDailyExpression(JSCronDailyExpression expression, long start, long end, int size) {
		return visitMidnightExpression(null, start, end, size);
	}

	@Override
	public List<Integer> visitMidnightExpression(JSCronMidnightExpression expression, long start, long end, int size) {
		return Arrays.asList(0);
	}

	@Override
	public List<Integer> visitHourlyExpression(JSCronHourlyExpression expression, long start, long end, int size) {
		return Arrays.asList(0);
	}

	@Override
	public abstract List<Integer> visitScheduleExpression(JSCronScheduleExpression expression, long start, long end, int size);

	@Override
	public List<Integer> visitListExpression(JSCronListExpression expression, long start, long end, int size, int months) {
		List<Integer> list = new ArrayList<>();
		for (JSExpression item : expression.expressionList) {
			list.addAll(visitExpression(item));
		}
		return list;
	}

	@Override
	public List<Integer> visitStepExpression(JSCronStepExpression expression, long start, long end, int size, int months) {
		List<Integer> list = new ArrayList<>();
		int min = 0;
		int max = 0;
		if (expression.expression instanceof JSCronRangeExpression) {
			min = ((JSCronNumberExpression) ((JSCronRangeExpression) expression.expression).min).number;
			max = ((JSCronNumberExpression) ((JSCronRangeExpression) expression.expression).max).number;
		} else if (expression.expression instanceof JSCronAllExpression) {
			min = ((JSCronAllExpression) expression.expression).min;
			max = ((JSCronAllExpression) expression.expression).max;
		} else if (expression.expression instanceof JSCronNumberExpression) {
			min = ((JSCronNumberExpression) expression.expression).number;
			max = JSCronExpression.getMax(expression.fieldType, months);
		}
		for (int i = min; i <= max; i += expression.step) {
			list.add(i);
		}
		return list;
	}

	@Override
	public List<Integer> visitAllExpression(JSCronAllExpression expression, long start, long end, int size, int months) {
		List<Integer> list = new ArrayList<>();
		int min = expression.min;
		int max = expression.max;
		for (int i = min; i <= max; i++) {
			list.add(i);
		}
		return list;
	}

	@Override
	public List<Integer> visitRangeExpression(JSCronRangeExpression expression, long start, long end, int size, int months) {
		List<Integer> list = new ArrayList<>();
		int min = ((JSCronNumberExpression) expression.min).number;
		int max = ((JSCronNumberExpression) expression.max).number;
		for (int i = min; i <= max; i++) {
			list.add(i);
		}
		return list;
	}

	@Override
	public List<Integer> visitNumberExpression(JSCronNumberExpression expression, long start, long end, int size, int months) {
		List<Integer> list = new ArrayList<>();
		list.add(expression.number);
		return list;
	}

	@Override
	public List<Integer> visitDayExpression(JSCronDayExpression expression, long start, long end, int size, int months) {
		return null;
	}

	@Override
	public List<Integer> visitWorkdayExpression(JSCronWorkdayExpression expression, long start, long end, int size, int months) {
		return null;
	}

	@Override
	public List<Integer> visitDayOfWeekExpression(JSCronDayOfWeekExpression expression, long start, long end, int size, int months) {
		return null;
	}

	@Override
	public List<Integer> visitOrdinalExpression(JSCronOrdinalExpression expression, long start, long end, int size, int months) {
		return null;
	}
	
	@Override
	public List<Integer> visitStatement(JSStatement statement) {
		return visitStatement(statement, 0, Long.MAX_VALUE, Integer.MAX_VALUE);
	}

	@Override
	public List<Integer> visitStatement(JSStatement statement, long start, long end, int size) {
		return ((JSCronStatement) statement).accept(this, start, end, size);
	}

	@Override
	public List<Integer> visitExpression(JSExpression expression) {
		return visitExpression(expression, 0, Long.MAX_VALUE, Integer.MAX_VALUE, 0);
	}

	@Override
	public List<Integer> visitExpression(JSExpression expression, long start, long end, int size, int months) {
		return ((JSCronExpression) expression).accept(this, start, end, size, months);
	}
}
