package jsuis.cron.visitor;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeSet;

import jsuis.cron.parser.JSCronFieldType;
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
import jsuis.cron.scanner.JSCronTokenType;
import jsuis.interpreter.parser.expression.JSExpression;
import jsuis.interpreter.parser.statement.JSStatement;
import jsuis.util.JSCalendarUtils;

/**
 * Cron scheduler
 * 
 * @author Yassuo Toda
 */
public class JSCronDateCalculator implements JSCronVisitor<List<Long>> {

	private static JSCronDateCalculator instance;
	
	public static JSCronDateCalculator getInstance() {
		if (instance == null) {
			instance = new JSCronDateCalculator();
		}
		return instance;
	}
	
	private long offset;
	
	public JSCronDateCalculator() {
		Calendar calendar = Calendar.getInstance();
		offset = calendar.getTimeInMillis();
		offset -= calendar.get(Calendar.HOUR_OF_DAY) * 3_600_000
				+ calendar.get(Calendar.MINUTE) * 60_000
				+ calendar.get(Calendar.SECOND) * 1_000
				+ calendar.get(Calendar.MILLISECOND);
		offset = offset % 86_400_000;
	}
	
	public long getOffset() {
		return offset;
	}
	
	public List<Long> calculate(List<JSStatement> statementList, long start, long end, int size) {
		TreeSet<Long> set = new TreeSet<>();
		for (JSStatement statement : statementList) {
			set.addAll(visitStatement((JSCronStatement) statement, start, end, size));
		}
		List<Long> list = new ArrayList<>();
		int count = 0;
		for (long date : set) {
			list.add(date);
			if (++count >= size) {
				break;
			}
		}
		for (int i = count; i < size; i++) {
			list.add(0L);
		}
		return list;
	}
	
	@Override
	public List<Long> visitScheduledJobStatement(JSCronScheduledJobStatement statement, long start, long end, int size) {
		if (statement.expression != null) {
			return visitExpression((JSCronExpression) statement.expression, start, end, size, 0);
		}
		return new ArrayList<>();
	}

	@Override
	public List<Long> visitRebootExpression(JSCronRebootExpression expression) {
		return new ArrayList<>();
	}

	@Override
	public List<Long> visitYearlyExpression(JSCronYearlyExpression expression, long start, long end, int size) {
		return visitAnnuallyExpression(null, start, end, size);
	}

	@Override
	public List<Long> visitAnnuallyExpression(JSCronAnnuallyExpression expression, long start, long end, int size) {
		List<Long> list = new ArrayList<>();
		Calendar calendar = Calendar.getInstance();
		calendar.setTimeInMillis(start);
		int year = calendar.get(Calendar.YEAR);
		calendar.clear();
		calendar.set(year, 0, 1);
		calendar.add(Calendar.YEAR, 1); // one year back
		int count = 0;
		while (count < size) {
			calendar.add(Calendar.YEAR, 1);
			long millis = calendar.getTimeInMillis();
			if (millis < start) {
				continue;
			}
			if (millis > end) {
				break;
			}
			list.add(millis);
			count++;
		}
		while (count < size) {
			list.add(0L);
			count++;
		}
		return list;
	}

	@Override
	public List<Long> visitMonthlyExpression(JSCronMonthlyExpresion expression, long start, long end, int size) {
		List<Long> list = new ArrayList<>();
		Calendar calendar = Calendar.getInstance();
		calendar.setTimeInMillis(start);
		int year = calendar.get(Calendar.YEAR);
		int month = calendar.get(Calendar.MONTH) + 1;
		calendar.clear();
		calendar.set(year, month - 1, 1);
		calendar.add(Calendar.MONTH, -1); // one month back
		int count = 0;
		while (count < size) {
			calendar.add(Calendar.MONTH, 1);
			long millis = calendar.getTimeInMillis();
			if (millis < start) {
				continue;
			}
			if (millis > end) {
				break;
			}
			list.add(millis);
			count++;
		}
		while (count < size) {
			list.add(0L);
			count++;
		}
		return list;
	}

	@Override
	public List<Long> visitWeeklyExpression(JSCronWeeklyExpression expression, long start, long end, int size) {
		List<Long> list = new ArrayList<>();
		Calendar calendar = Calendar.getInstance();
		calendar.setTimeInMillis(start);
		int dayOfWeek = calendar.get(Calendar.DAY_OF_WEEK);
		long millis = start;
		millis -= offset;
		millis /= 3_600_000;
		int hour = (int) (millis % 24);
		millis -= hour; // midnight
		millis *= 3_600_000;
		millis += offset;
		millis += dayOfWeek * 86_400_000; // next Sunday
		millis -= 7 * 86_400_000; // one week back
		calendar.add(Calendar.DAY_OF_MONTH, dayOfWeek);
		int count = 0;
		while (count < size) {
			millis += 7 * 86_400_000;
			if (millis < start) {
				continue;
			}
			if (millis > end) {
				break;
			}
			list.add(millis);
			count++;
		}
		while (count < size) {
			list.add(0L);
			count++;
		}
		return list;
	}

	@Override
	public List<Long> visitDailyExpression(JSCronDailyExpression expression, long start, long end, int size) {
		return visitMidnightExpression(null, start, end, size);
	}
	
	@Override
	public List<Long> visitMidnightExpression(JSCronMidnightExpression expression, long start, long end, int size) {
		List<Long> list = new ArrayList<>();
		long millis = start;
		millis -= offset;
		millis /= 3_600_000;
		int hour = (int) (millis % 24);
		millis -= hour; // midnight
		millis *= 3_600_000;
		millis += offset;
		millis -= 86_400_000; // one day back
		int count = 0;
		while (count < size) {
			millis += 86_400_000;
			if (millis < start) {
				continue;
			}
			if (millis > end) {
				break;
			}
			list.add(millis);
			count++;
		}
		while (count < size) {
			list.add(0L);
			count++;
		}
		return list;
	}

	@Override
	public List<Long> visitHourlyExpression(JSCronHourlyExpression expression, long start, long end, int size) {
		return visitMidnightExpression(null, start, end, size);
	}
	
	@Override
	public List<Long> visitScheduleExpression(JSCronScheduleExpression expression, long start, long end, int size) {
		List<Long> list = new ArrayList<>();
		Set<Long> set = new TreeSet<>();
		List<Integer> yearList = null;
		if (expression.yearExpression != null) {
			yearList = new ArrayList<>();
			List<Long> longList = visitExpression((JSCronExpression) expression.yearExpression, start, end, size, 0);
			Calendar startCalendar = Calendar.getInstance();
			startCalendar.setTimeInMillis(start);
			int startYear = startCalendar.get(Calendar.YEAR);
			Calendar endCalendar = Calendar.getInstance();
			endCalendar.setTimeInMillis(end);
			int endYear = endCalendar.get(Calendar.YEAR);
			for (Long year : longList) {
				if (year < startYear || year > endYear) {
					continue;
				}
				yearList.add(year.intValue());
			}
			if (yearList.isEmpty()) {
				for (int i = 0; i < size; i++) {
					list.add(0L);
				}
				return list;
			}
			Collections.sort(yearList);
		}
		Set<Integer> monthSet = toIntegerSet(visitExpression((JSCronExpression) expression.monthExpression, start, end, size, 0));
		Set<Long> dateSet = new TreeSet<>();
		Calendar calendar = Calendar.getInstance();
		calendar.setTimeInMillis(start);
		int year = calendar.get(Calendar.YEAR);
		int month = calendar.get(Calendar.MONTH) + 1;
		int months = year * 12 + month - 1;
		calendar.clear();
		calendar.set(year, month - 1, 1);
		calendar.add(Calendar.MONTH, -2); // two month back
		months -= 2;
		int count = 0;
		boolean done = false;
		while (!done) {
			calendar.add(Calendar.MONTH, 1);
			months++;
			year = months / 12;
			if (yearList != null) {
				if (!yearList.contains(year)) {
					if (year > yearList.get(yearList.size() - 1)) {
						break;
					}
					continue;
				}
			} else if (count++ > 26 && set.isEmpty()) {
				break;
			}
			month = months % 12 + 1;
			if (!monthSet.contains(month)) {
				continue;
			}
			if (expression.dayOfMonthExpression instanceof JSCronAllExpression) {
				dateSet.addAll(visitExpression((JSCronExpression) expression.dayOfWeekExpression, start, end, size, months));
			} else if (expression.dayOfWeekExpression instanceof JSCronAllExpression) {
				dateSet.addAll(visitExpression((JSCronExpression) expression.dayOfMonthExpression, start, end, size, months));
			} else {
				dateSet.addAll(visitExpression((JSCronExpression) expression.dayOfMonthExpression, start, end, size, months));
				dateSet.addAll(visitExpression((JSCronExpression) expression.dayOfWeekExpression, start, end, size, months));
			}
			long millis = calendar.getTimeInMillis();
			for (long date : dateSet) {
				if (date < start) {
					continue;
				}
				if (date < millis) {
					if (date > end) {
						done = true;
						break;
					}
					if (set.size() < size) {
						set.add(date);
					} else {
						done = true;
						break;
					}
				}
			}
		}
		for (long date : dateSet) {
			if (date < start) {
				continue;
			}
			if (date > end) {
				break;
			}
			if (set.size() < size) {
				set.add(date);
			} else {
				break;
			}
		}
		list.addAll(set);
		for (int i = list.size(); i < size; i++) {
			list.add(0L);
		}
		return list;
	}
	
	public Set<Integer> toIntegerSet(List<Long> longList) {
		Set<Integer> integerSet = new HashSet<>();
		for (Long l : longList) {
			integerSet.add(l.intValue());
		}
		return integerSet;
	}
	
	@Override
	public List<Long> visitFieldExpression(JSCronFieldExpression expression, long start, long end, int size, int months) {
		List<Long> list = new ArrayList<>();
		for (JSExpression item : expression.expressionList) {
			list.addAll(visitExpression((JSCronExpression) item, start, end, size, months));
		}
		return list;
	}

	@Override
	public List<Long> visitStepExpression(JSCronStepExpression expression, long start, long end, int size, int months) {
		List<Long> list = new ArrayList<>();
		int min = 0;
		int max = 0;
		if (expression.expression instanceof JSCronRangeExpression) {
			min = ((JSCronNumberExpression) ((JSCronRangeExpression) expression.expression).min).number;
			max = ((JSCronNumberExpression) ((JSCronRangeExpression) expression.expression).max).number;
			if (expression.fieldType == JSCronFieldType.DAY_OF_MONTH && months != 0) {
				max = Math.min(JSCronExpression.getMax(expression.fieldType, months), max);
			}
		} else if (expression.expression instanceof JSCronAllExpression) {
			min = ((JSCronAllExpression) expression.expression).min;
			max = ((JSCronAllExpression) expression.expression).max;
			if (expression.fieldType == JSCronFieldType.DAY_OF_MONTH && months != 0) {
				max = JSCronExpression.getMax(expression.fieldType, months);
			}
		} else if (expression.expression instanceof JSCronNumberExpression) {
			min = ((JSCronNumberExpression) expression.expression).number;
			max = JSCronExpression.getMax(expression.fieldType, months);
		}
		if (expression.fieldType == JSCronFieldType.DAY_OF_MONTH && months != 0) {
			long millis = JSCalendarUtils.toCalendar(months / 12, months % 12 + 1, min).getTimeInMillis();
			for (long i = 0; i <= max - min; i += expression.step) {
				if (millis > end) {
					break;
				}
				if (millis >= start) {
					list.add(millis);
				}
				millis += 86_400_000;
			}
		} else if (expression.fieldType == JSCronFieldType.DAY_OF_WEEK && months != 0) {
			Set<Integer> dayOfWeekSet = new HashSet<>();
			for (int i = min; i <= max; i += expression.step) {
				dayOfWeekSet.add(i);
			}
			Calendar calendar = JSCalendarUtils.toCalendar(months / 12, months % 12 + 1, 1);
			long millis = calendar.getTimeInMillis();
			int dayOfWeek = calendar.get(Calendar.DAY_OF_WEEK) - 1;
			int maxDayOfMonth = JSCronExpression.getMax(JSCronFieldType.DAY_OF_MONTH, months);
			for (int i = 0; i < maxDayOfMonth; i++) {
				if (millis > end) {
					break;
				}
				if (dayOfWeekSet.contains(dayOfWeek)) {
					if (millis >= start) {
						list.add(millis);
					}
				}
				millis += 86_400_000;
				dayOfWeek = ++dayOfWeek % 7;
			}
		} else {
			for (long l = min; l <= max; l += expression.step) {
				list.add(l);
			}
		}
		return list;
	}

	@Override
	public List<Long> visitAllExpression(JSCronAllExpression expression, long start, long end, int size, int months) {
		List<Long> list = new ArrayList<>();
		if ((expression.fieldType == JSCronFieldType.DAY_OF_MONTH || expression.fieldType == JSCronFieldType.DAY_OF_WEEK) && months != 0) {
			long millis = JSCalendarUtils.toCalendar(months / 12, months % 12 + 1, 1).getTimeInMillis();
			int maxDayOfMonth = JSCronExpression.getMax(JSCronFieldType.DAY_OF_MONTH, months);
			for (int i = 0; i < maxDayOfMonth; i++) {
				if (millis > end) {
					break;
				}
				if (millis >= start) {
					list.add(millis);
				}
				millis += 86_400_000;
			}
		} else {
			int min = expression.min;
			int max = expression.max;
			for (long l = min; l <= max; l++) {
				list.add(l);
			}
		}
		return list;
	}
	
	@Override
	public List<Long> visitRangeExpression(JSCronRangeExpression expression, long start, long end, int size, int months) {
		List<Long> list = new ArrayList<>();
		int min = ((JSCronNumberExpression) expression.min).number;
		int max = ((JSCronNumberExpression) expression.max).number;
		if (expression.fieldType == JSCronFieldType.DAY_OF_MONTH && months != 0) {
			max = Math.min(JSCronExpression.getMax(expression.fieldType, months), max);
			long millis = JSCalendarUtils.toCalendar(months / 12, months % 12 + 1, min).getTimeInMillis();
			for (long i = 0; i <= max - min; i++) {
				if (millis > end) {
					break;
				}
				if (millis >= start) {
					list.add(millis);
				}
				millis += 86_400_000;
			}
		} else if (expression.fieldType == JSCronFieldType.DAY_OF_WEEK && months != 0) {
			Set<Integer> dayOfWeekSet = new HashSet<>();
			for (int i = min; i <= max; i++) {
				dayOfWeekSet.add(i);
			}
			Calendar calendar = JSCalendarUtils.toCalendar(months / 12, months % 12 + 1, 1);
			long millis = calendar.getTimeInMillis();
			int dayOfWeek = calendar.get(Calendar.DAY_OF_WEEK) - 1;
			int maxDayOfMonth = JSCronExpression.getMax(JSCronFieldType.DAY_OF_MONTH, months);
			for (int i = 0; i < maxDayOfMonth; i++) {
				if (millis > end) {
					break;
				}
				if (dayOfWeekSet.contains(dayOfWeek)) {
					if (millis >= start) {
						list.add(millis);
					}
				}
				millis += 86_400_000;
				dayOfWeek = ++dayOfWeek % 7;
			}
		} else {
			for (long l = min; l <= max; l++) {
				list.add(l);
			}
		}
		return list;
	}

	@Override
	public List<Long> visitNumberExpression(JSCronNumberExpression expression, long start, long end, int size, int months) {
		List<Long> list = new ArrayList<>();
		int number = expression.number;
		if (expression.fieldType == JSCronFieldType.DAY_OF_MONTH && number == -1) {
			number = JSCronExpression.getMax(expression.fieldType, months);
		}
		if (expression.fieldType == JSCronFieldType.DAY_OF_MONTH && months != 0) {
			long millis = JSCalendarUtils.toCalendar(months / 12, months % 12 + 1, number).getTimeInMillis();
			if (millis >= start && millis <= end) {
				list.add(millis);
			}
		} else if (expression.fieldType == JSCronFieldType.DAY_OF_WEEK && months != 0) {
			Calendar calendar = JSCalendarUtils.toCalendar(months / 12, months % 12 + 1, 1);
			long millis = calendar.getTimeInMillis();
			int dayOfWeek = calendar.get(Calendar.DAY_OF_WEEK) - 1;
			int maxDayOfMonth = JSCronExpression.getMax(JSCronFieldType.DAY_OF_MONTH, months);
			int i = (number + 7 - dayOfWeek) % 7;
			millis += (i - 1) * 86_400_000;
			for (; i < maxDayOfMonth; i += 7) {
				if (millis > end) {
					break;
				}
				if (millis >= start) {
					list.add(millis);
				}
				millis += 604_800_000;
			}
		} else {
			list.add((long) number);
		}
		return list;
	}
	
	@Override
	public List<Long> visitDayExpression(JSCronDayExpression expression, long start, long end, int size, int months) {
		List<Long> list = visitExpression((JSCronExpression) expression.expression, start, end, size, months);
		if (expression.offset == 0) {
			return list;
		}
		if (list.isEmpty()) {
			return list;
		}
		return Arrays.asList(list.get(0) + (expression.offset > 0 ? expression.offset - 1 : expression.offset + 1) * 86_400_000);
	}

	@Override
	public List<Long> visitWorkdayExpression(JSCronWorkdayExpression expression, long start, long end, int size, int months) {
		List<Long> list = visitExpression((JSCronExpression) expression.expression, start, end, size, months);
		if (list.isEmpty()) {
			return list;
		}
		long millis = list.get(0);
		Calendar calendar = Calendar.getInstance();
		calendar.setTimeInMillis(millis);
		if (expression.offset < 0) {
			Calendar previousWorkday = getPreviousWorkday(millis, -(expression.offset + 1));
			long previousWorkdayMillis = previousWorkday.getTimeInMillis();
			return Arrays.asList(previousWorkdayMillis);
		} else if (expression.offset > 0) {
			Calendar nextWorkday = getNextWorkday(millis, expression.offset - 1);
			long nextWorkdayMillis = nextWorkday.getTimeInMillis();
			return Arrays.asList(nextWorkdayMillis);
		} else {
			if (isWorkday(calendar)) {
				return list;
			} else {
				Calendar previousWorkday = getPreviousWorkday(millis, 0);
				long previousWorkdayMillis = previousWorkday.getTimeInMillis();
				Calendar nextWorkday = getNextWorkday(millis, 0);
				long nextWorkdayMillis = nextWorkday.getTimeInMillis();
				if (millis - previousWorkdayMillis < nextWorkdayMillis - millis) {
					if (previousWorkday.get(Calendar.MONTH) + 1 == months % 12 + 1) {
						return Arrays.asList(previousWorkdayMillis);
					} else {
						return Arrays.asList(nextWorkdayMillis);
					}
				} else {
					if (nextWorkday.get(Calendar.MONTH) + 1 == months % 12 + 1) {
						return Arrays.asList(nextWorkdayMillis);
					} else {
						return Arrays.asList(previousWorkdayMillis);
					}
				}
			}
		}
	}
	
	public Calendar getPreviousWorkday(long millis, int days) {
		Calendar calendar = JSCalendarUtils.toCalendar(millis);
		while (!isWorkday(calendar)) {
			calendar.add(Calendar.DAY_OF_MONTH, -1);
		}
		for (int i = 0; i < days; i++) {
			do {
				calendar.add(Calendar.DAY_OF_MONTH, -1);
			} while (!isWorkday(calendar));
		}
		return calendar;
	}
	
	public Calendar getNextWorkday(long millis, int days) {
		Calendar calendar = JSCalendarUtils.toCalendar(millis);
		while (!isWorkday(calendar)) {
			calendar.add(Calendar.DAY_OF_MONTH, 1);
		}
		for (int i = 0; i < days; i++) {
			do {
				calendar.add(Calendar.DAY_OF_MONTH, 1);
			} while (!isWorkday(calendar));
		}
		return calendar;
	}
	
	public boolean isWorkday(Calendar calendar) {
		int dayOfWeek = calendar.get(Calendar.DAY_OF_WEEK) - 1;
		if (dayOfWeek == 0 || dayOfWeek == 6) {
			return false;
		}
		return true;
	}
	
	@Override
	public List<Long> visitDayOfWeekExpression(JSCronDayOfWeekExpression expression, long start, long end, int size, int months) {
		List<Long> list = new ArrayList<>();
		int number = getTokenValue((JSCronTokenType) expression.tokenType);
		if (months != 0) {
			Calendar calendar = JSCalendarUtils.toCalendar(months / 12, months % 12 + 1, 1);
			long millis = calendar.getTimeInMillis();
			int dayOfWeek = calendar.get(Calendar.DAY_OF_WEEK) - 1;
			int maxDayOfMonth = JSCronExpression.getMax(JSCronFieldType.DAY_OF_MONTH, months);
			int i = (number + 7 - dayOfWeek) % 7;
			millis += (i - 1) * 86_400_000;
			for (; i < maxDayOfMonth; i += 7) {
				if (millis > end) {
					break;
				}
				if (millis >= start) {
					list.add(millis);
				}
				millis += 604_800_000;
			}
		} else {
			list.add((long) number);
		}
		return list;
	}
	
	@Override
	public List<Long> visitOrdinalExpression(JSCronOrdinalExpression expression, long start, long end, int size, int months) {
		List<Long> list = new ArrayList<>();
		int number;
		if (expression.expression instanceof JSCronDayOfWeekExpression) {
			number = getTokenValue((JSCronTokenType) ((JSCronDayOfWeekExpression) expression.expression).tokenType);
		} else {
			number = ((JSCronNumberExpression) expression.expression).number;
		}
		if (months != 0) {
			if (expression.ordinal == -1) {
				int maxDayOfMonth = JSCronExpression.getMax(JSCronFieldType.DAY_OF_MONTH, months);
				Calendar calendar = JSCalendarUtils.toCalendar(months / 12, months % 12 + 1, maxDayOfMonth);
				long millis = calendar.getTimeInMillis();
				int dayOfWeek = calendar.get(Calendar.DAY_OF_WEEK) - 1;
				int i = (dayOfWeek + 7 - number) % 7;
				millis -= i * 86_400_000;
				if (millis >= start && millis <= end) {
					list.add(millis);
				}
			} else {
				Calendar calendar = JSCalendarUtils.toCalendar(months / 12, months % 12 + 1, 1);
				long millis = calendar.getTimeInMillis();
				int dayOfWeek = calendar.get(Calendar.DAY_OF_WEEK) - 1;
				int maxDayOfMonth = JSCronExpression.getMax(JSCronFieldType.DAY_OF_MONTH, months);
				int i = (number + 7 - dayOfWeek) % 7 + (expression.ordinal - 1) * 7;
				while (i >= maxDayOfMonth) {
					i -= 7;
				}
				millis += i * 86_400_000;
				if (millis >= start && millis <= end) {
					list.add(millis);
				}
			}
		}
		return list;
	}
	
	private static Map<JSCronTokenType, Integer> tokenValueMap = new HashMap<>();
	
	public static int getTokenValue(JSCronTokenType tokenType) {
		return tokenValueMap.get(tokenType);
	}
	
	static {
		tokenValueMap.put(JSCronTokenType.SUN, 0);
		tokenValueMap.put(JSCronTokenType.MON, 1);
		tokenValueMap.put(JSCronTokenType.TUE, 2);
		tokenValueMap.put(JSCronTokenType.WED, 3);
		tokenValueMap.put(JSCronTokenType.THU, 4);
		tokenValueMap.put(JSCronTokenType.FRI, 5);
		tokenValueMap.put(JSCronTokenType.SAT, 6);
	}

	@Override
	public List<Long> visitStatement(JSCronStatement statement, long start, long end, int size) {
		return statement.accept(this, start, end, size);
	}

	@Override
	public List<Long> visitExpression(JSCronExpression expression, long start, long end, int size, int months) {
		return expression.accept(this, start, end, size, months);
	}
}
