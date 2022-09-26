package jsuis.cron.visitor;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvFileSource;

import jsuis.cron.parser.JSCronParser;
import jsuis.cron.scanner.JSCronScanner;
import jsuis.interpreter.parser.statement.JSStatement;
import jsuis.interpreter.scanner.JSToken;

class JSCronMinuteCalculatorTests {

	private static int row;
	
	@ParameterizedTest
	@CsvFileSource(resources = "JSCronMinuteCalculatorTests.csv", delimiter = ';', encoding = "ISO-8859-1")
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
		Set<Integer> minuteList = JSCronMinuteCalculator.getInstance().calculate(statementList);
		String actual = "" + toStringList(minuteList);
		assertEquals(expected, actual);
	}
	
	public List<String> toStringList(Set<Integer> minuteList) {
		if (minuteList == null) {
			return null;
		}
		List<String> stringList = new ArrayList<>();
		for (int minute : minuteList) {
			stringList.add(String.format("%02d", minute));
		}
		return stringList;
	}
}
