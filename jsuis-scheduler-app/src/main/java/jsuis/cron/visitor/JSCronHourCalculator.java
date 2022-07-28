package jsuis.cron.visitor;

import java.util.List;

import jsuis.cron.parser.expression.JSCronExpression;
import jsuis.cron.parser.expression.JSCronScheduleExpression;

public class JSCronHourCalculator extends JSCronTimeCalculator {
	
	private static JSCronHourCalculator instance;
	
	public static JSCronHourCalculator getInstance() {
		if (instance == null) {
			instance = new JSCronHourCalculator();
		}
		return instance;
	}
	
	@Override
	public List<Integer> visitScheduleExpression(JSCronScheduleExpression expression, long start, long end, int size) {
		return visitExpression((JSCronExpression) expression.hourExpression, start, end, size, 0);
	}
}
