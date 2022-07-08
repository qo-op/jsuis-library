package jsuis.parser.cron;

import java.util.Calendar;

import jsuis.parser.JSExpression;
import jsuis.visitor.cron.JSCronExpressionVisitor;

/**
 * Cron expresson
 * 
 * @author Yassuo Toda
 */
public abstract class JSCronExpression implements JSExpression {

	public abstract <R> R accept(JSCronExpressionVisitor<R> visitor, long start, long end, int size, int months);
	
	public static int getMin(JSCronFieldType fieldType, int months) {
		int min = 0;
		switch (fieldType) {
		case DAY_OF_MONTH:
			min = 1;
			break;
		case MONTH:
			min = 1;
			break;
		default:
		}
		return min;
	}
	
	public static int getMax(JSCronFieldType fieldType, int months) {
		int max = 0;
		switch (fieldType) {
		case MINUTE:
			max = 59;
			break;
		case HOUR:
			max = 23;
			break;
		case DAY_OF_MONTH:
			if (months == 0) {
				max = 31;
			} else {
				int year = months / 12;
				int month = months % 12 + 1;
				Calendar calendar = Calendar.getInstance();
				calendar.clear();
				calendar.set(year, month - 1, 1);
				calendar.add(Calendar.MONTH, 1);
				calendar.add(Calendar.DAY_OF_MONTH, -1);
				max = calendar.get(Calendar.DAY_OF_MONTH);
			}
			break;
		case MONTH:
			max = 12;
			break;
		case DAY_OF_WEEK:
			max = 6;
		default:
		}
		return max;
	}
}
