package jsuis.visitor.cron;

import java.util.List;

import jsuis.parser.cron.expression.JSCronScheduleExpression;

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
		return visitExpression(expression.hourExpression);
	}
}
