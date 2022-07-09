package jsuis.cron.visitor;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.TreeSet;

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
import jsuis.interpreter.parser.expression.JSExpression;
import jsuis.interpreter.parser.statement.JSStatement;

public abstract class JSCronTimeCalculator implements JSCronVisitor<List<Integer>> {
	
	public Set<Integer> calculate(List<JSStatement> statementList) {
		TreeSet<Integer> set = new TreeSet<>();
		for (JSStatement statement : statementList) {
			set.addAll(visitStatement((JSCronStatement) statement, 0, Long.MAX_VALUE, 0));
		}
		return set;
	}

	@Override
	public List<Integer> visitScheduledJobStatement(JSCronScheduledJobStatement statement, long start, long end, int size) {
		if (statement.expression != null) {
			return visitExpression((JSCronExpression) statement.expression, start, end, size, 0);
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
	public List<Integer> visitFieldExpression(JSCronFieldExpression expression, long start, long end, int size, int months) {
		List<Integer> list = new ArrayList<>();
		for (JSExpression item : expression.expressionList) {
			list.addAll(visitExpression((JSCronExpression) item, start, end, size, months));
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
	public List<Integer> visitStatement(JSCronStatement statement, long start, long end, int size) {
		return statement.accept(this, start, end, size);
	}

	@Override
	public List<Integer> visitExpression(JSCronExpression expression, long start, long end, int size, int months) {
		return expression.accept(this, start, end, size, months);
	}
}
