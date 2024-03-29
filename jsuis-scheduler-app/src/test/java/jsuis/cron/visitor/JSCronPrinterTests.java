package jsuis.cron.visitor;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.List;

import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvFileSource;

import jsuis.cron.parser.JSCronParser;
import jsuis.cron.parser.statement.JSCronStatement;
import jsuis.cron.scanner.JSCronScanner;
import jsuis.interpreter.parser.statement.JSStatement;
import jsuis.interpreter.scanner.JSToken;

class JSCronPrinterTests {

	private static final JSCronPrinter CRON_PRINTER = new JSCronPrinter();
	
	private static int row;
	
	@ParameterizedTest
	@CsvFileSource(resources = "JSCronVisitorTests.csv", delimiter = ';', encoding = "ISO-8859-1")
	void parameterizedTest(String source) {
		if (++row < 2) {
			return;
		}
		System.out.println("Row " + row + ": " + source);
		JSCronScanner cronScanner = new JSCronScanner(source, row);
		List<JSToken> tokenList = cronScanner.scan();
		JSCronParser cronParser = new JSCronParser(tokenList);
		List<JSStatement> statementList = cronParser.parse();
		String expected = source;
		String actual = CRON_PRINTER.visitStatement((JSCronStatement) statementList.get(0), 0, Long.MAX_VALUE, 0);
		assertEquals(expected, actual);
	}
}
