package jsuis.visitor.cron;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvFileSource;

import jsuis.cron.parser.JSCronParser;
import jsuis.cron.scanner.JSCronScanner;
import jsuis.cron.visitor.JSCronDateCalculator;
import jsuis.interpreter.parser.statement.JSStatement;
import jsuis.interpreter.scanner.JSToken;
import jsuis.util.JSCalendarUtils;

class JSCronDateCalculatorTests {

	private static final SimpleDateFormat ddMMyyyy = new SimpleDateFormat("dd/MM/yyyy");
	
	private static int row;
	
	private static long start = JSCalendarUtils.toCalendar(2022, 1, 1).getTimeInMillis();
	
	@ParameterizedTest
	@CsvFileSource(resources = "JSCronDateCalculatorTests.csv", delimiter = ';', encoding = "ISO-8859-1")
	void parameterizedTest(String source, String expected) {
		if (++row < 2) {
			return;
		}
		/*
		if (row != 2) {
			return;
		}
		*/
		System.out.println("Row " + row + ": " + source);
		JSCronScanner cronScanner = new JSCronScanner(source, row);
		List<JSToken> tokenList = cronScanner.scan();
		JSCronParser cronParser = new JSCronParser(tokenList);
		List<JSStatement> statementList = cronParser.parse();
		List<Long> dateList = JSCronDateCalculator.getInstance().calculate(statementList, start, Long.MAX_VALUE, 3);
		String actual = "" + toStringList(dateList);
		assertEquals(expected, actual);
	}
	
	public List<String> toStringList(List<Long> dateList) {
		if (dateList == null) {
			return null;
		}
		List<String> stringList = new ArrayList<>();
		for (long date : dateList) {
			if (date == 0) {
				stringList.add("0");
			} else {
				stringList.add(ddMMyyyy.format(new Date(date)));
			}
		}
		return stringList;
	}
}
