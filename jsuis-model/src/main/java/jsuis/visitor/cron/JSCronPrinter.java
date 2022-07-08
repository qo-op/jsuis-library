package jsuis.visitor.cron;

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
import jsuis.scanner.cron.JSCronScanner;

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
		text.append(visitStatement(statementList.get(0)));
		for (int i = 1; i < size; i++) {
			text.append("\n").append(visitStatement(statementList.get(i)));
		}
		return text.toString();
	}
	
	@Override
	public String visitScheduledJobStatement(JSCronScheduledJobStatement statement, long start, long end, int size) {
		return visitExpression(statement.expression) + " " + statement.command;
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
		return visitExpression(expression.minuteExpression)
				+ " " + visitExpression(expression.hourExpression)
				+ " " + visitExpression(expression.dayOfMonthExpression)
				+ " " + visitExpression(expression.monthExpression)
				+ " " + visitExpression(expression.dayOfWeekExpression)
				+ (expression.yearExpression != null ? " " + visitExpression(expression.yearExpression) : "");
	}

	@Override
	public String visitListExpression(JSCronListExpression expression, long start, long end, int size, int months) {
		List<JSExpression> expressionList = expression.expressionList;
		int expressionListSize = expressionList.size();
		StringBuffer text = new StringBuffer();
		text.append(visitExpression(expressionList.get(0)));
		for (int i = 1; i < expressionListSize; i++) {
			text.append(",");
			text.append(visitExpression(expressionList.get(i)));
		}
		return text.toString();
	}

	@Override
	public String visitStepExpression(JSCronStepExpression expression, long start, long end, int size, int months) {
		return visitExpression(expression.expression) + "/" + expression.step;
	}

	@Override
	public String visitAllExpression(JSCronAllExpression expression, long start, long end, int size, int months) {
		return "*";
	}
	
	@Override
	public String visitRangeExpression(JSCronRangeExpression expression, long start, long end, int size, int months) {
		return visitExpression(expression.min) + "-" + visitExpression(expression.max);
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
		return visitExpression(expression.expression) + expression.prefix + "D" + (expression.offset > 0 ? "+" : "-") + (Math.abs(expression.offset) - 1);
	}

	@Override
	public String visitWorkdayExpression(JSCronWorkdayExpression expression, long start, long end, int size, int months) {
		if (expression.offset == 0) {
			return visitExpression(expression.expression) + "W";
		}
		return visitExpression(expression.expression) + "WD" + (expression.offset > 0 ? "+" : "-") + (Math.abs(expression.offset) - 1);
	}
	
	@Override
	public String visitDayOfWeekExpression(JSCronDayOfWeekExpression expression, long start, long end, int size, int months) {
		return JSCronScanner.getTokenString(expression.tokenType);
	}

	@Override
	public String visitOrdinalExpression(JSCronOrdinalExpression expression, long start, long end, int size, int months) {
		if (expression.ordinal == -1) {
			return visitExpression(expression.expression) + "L";
		}
		return visitExpression(expression.expression) + "#" + expression.ordinal;
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
		return visitExpression(expression, 0, Long.MAX_VALUE, 0, 0);
	}

	@Override
	public String visitExpression(JSExpression expression, long start, long end, int size, int months) {
		return ((JSCronExpression) expression).accept(this, start, end, size, months);
	}
}
