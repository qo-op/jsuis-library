package jsuis.cron.visitor;

import java.util.List;

import jsuis.cron.parser.expression.JSCronExpression;
import jsuis.cron.parser.expression.JSCronScheduleExpression;

public class JSCronMinuteCalculator extends JSCronTimeCalculator {
	
	private static JSCronMinuteCalculator instance;
	
	public static JSCronMinuteCalculator getInstance() {
		if (instance == null) {
			instance = new JSCronMinuteCalculator();
		}
		return instance;
	}

	@Override
	public List<Integer> visitScheduleExpression(JSCronScheduleExpression expression, long start, long end, int size) {
		return visitExpression((JSCronExpression) expression.minuteExpression, start, end, size, 0);
	}
}
