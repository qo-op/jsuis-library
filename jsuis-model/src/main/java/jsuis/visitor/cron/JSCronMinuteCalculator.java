package jsuis.visitor.cron;

import java.util.List;

import jsuis.parser.cron.expression.JSCronScheduleExpression;

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
		return visitExpression(expression.minuteExpression);
	}
}
