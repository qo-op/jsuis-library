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
import jsuis.cron.scanner.JSCronScanner;
import jsuis.interpreter.parser.expression.JSExpression;
import jsuis.interpreter.parser.statement.JSStatement;

/**
 * Cron printer
 * 
 * @author Yassuo Toda
 */
public class JSCronPrinter implements JSCronVisitor<String> {

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
		return visitExpression((JSCronExpression) statement.expression, start, end, size, 0) + " " + statement.command;
	}
	
	@Override
	public String visitRebootExpression(JSCronRebootExpression expression) {
		return "@reboot";
	}
	
	@Override
	public String visitYearlyExpression(JSCronYearlyExpression expression, long start, long end, int size) {
		return "@yearly";
	}
	
	@Override
	public String visitAnnuallyExpression(JSCronAnnuallyExpression expression, long start, long end, int size) {
		return "@annually";
	}

	@Override
	public String visitMonthlyExpression(JSCronMonthlyExpresion expression, long start, long end, int size) {
		return "@monthly";
	}

	@Override
	public String visitWeeklyExpression(JSCronWeeklyExpression expression, long start, long end, int size) {
		return "@weekly";
	}

	@Override
	public String visitDailyExpression(JSCronDailyExpression expression, long start, long end, int size) {
		return "@daily";
	}

	@Override
	public String visitMidnightExpression(JSCronMidnightExpression expression, long start, long end, int size) {
		return "@midnight";
	}

	@Override
	public String visitHourlyExpression(JSCronHourlyExpression expression, long start, long end, int size) {
		return "@hourly";
	}

	@Override
	public String visitScheduleExpression(JSCronScheduleExpression expression, long start, long end, int size) {
		return visitExpression((JSCronExpression) expression.minuteExpression, start, end, size, 0)
				+ " " + visitExpression((JSCronExpression) expression.hourExpression, start, end, size, 0)
				+ " " + visitExpression((JSCronExpression) expression.dayOfMonthExpression, start, end, size, 0)
				+ " " + visitExpression((JSCronExpression) expression.monthExpression, start, end, size, 0)
				+ " " + visitExpression((JSCronExpression) expression.dayOfWeekExpression, start, end, size, 0)
				+ (expression.yearExpression != null ? " " + visitExpression((JSCronExpression) expression.yearExpression, start, end, size, 0) : "");
	}

	@Override
	public String visitFieldExpression(JSCronFieldExpression expression, long start, long end, int size, int months) {
		List<JSExpression> expressionList = expression.expressionList;
		int expressionListSize = expressionList.size();
		StringBuffer text = new StringBuffer();
		text.append(visitExpression((JSCronExpression) expressionList.get(0), start, end, size, months));
		for (int i = 1; i < expressionListSize; i++) {
			text.append(",");
			text.append(visitExpression((JSCronExpression) expressionList.get(i), start, end, size, months));
		}
		return text.toString();
	}

	@Override
	public String visitStepExpression(JSCronStepExpression expression, long start, long end, int size, int months) {
		return visitExpression((JSCronExpression) expression.expression, start, end, size, months) + "/" + expression.step;
	}

	@Override
	public String visitAllExpression(JSCronAllExpression expression, long start, long end, int size, int months) {
		return "*";
	}
	
	@Override
	public String visitRangeExpression(JSCronRangeExpression expression, long start, long end, int size, int months) {
		return visitExpression((JSCronExpression) expression.min, start, end, size, months) + "-" + visitExpression((JSCronExpression) expression.max, start, end, size, months);
	}

	@Override
	public String visitNumberExpression(JSCronNumberExpression expression, long start, long end, int size, int months) {
		if (expression.number == -1) {
			return "L";
		}
		return "" + expression.number;
	}

	@Override
	public String visitDayExpression(JSCronDayExpression expression, long start, long end, int size, int months) {
		return visitExpression((JSCronExpression) expression.expression, start, end, size, months) + expression.prefix + "D" + (expression.offset > 0 ? "+" : "-") + (Math.abs(expression.offset) - 1);
	}

	@Override
	public String visitWorkdayExpression(JSCronWorkdayExpression expression, long start, long end, int size, int months) {
		if (expression.offset == 0) {
			return visitExpression((JSCronExpression) expression.expression, start, end, size, months) + "W";
		}
		return visitExpression((JSCronExpression) expression.expression, start, end, size, months) + "WD" + (expression.offset > 0 ? "+" : "-") + (Math.abs(expression.offset) - 1);
	}
	
	@Override
	public String visitDayOfWeekExpression(JSCronDayOfWeekExpression expression, long start, long end, int size, int months) {
		return JSCronScanner.getTokenString(expression.tokenType);
	}

	@Override
	public String visitOrdinalExpression(JSCronOrdinalExpression expression, long start, long end, int size, int months) {
		if (expression.ordinal == -1) {
			return visitExpression((JSCronExpression) expression.expression, start, end, size, months) + "L";
		}
		return visitExpression((JSCronExpression) expression.expression, start, end, size, months) + "#" + expression.ordinal;
	}

	@Override
	public String visitStatement(JSCronStatement statement, long start, long end, int size) {
		return statement.accept(this, start, end, size);
	}

	@Override
	public String visitExpression(JSCronExpression expression, long start, long end, int size, int months) {
		return expression.accept(this, start, end, size, months);
	}
}
