package jsuis.util;

import java.util.Calendar;

/**
 * Calendar utils
 * 
 * @author Yassuo Toda
 */
public class JSCalendarUtils {

	public static Calendar toCalendar(int year, int month, int dayOfMonth) {
		Calendar calendar = Calendar.getInstance();
		calendar.clear();
		calendar.set(year, month - 1, dayOfMonth);
		return calendar;
	}
	
	public static Calendar toCalendar(long millis) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTimeInMillis(millis);
		return calendar;
	}
}
