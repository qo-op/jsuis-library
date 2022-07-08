package jsuis.visitor.cron;

import java.util.List;

import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvFileSource;

import jsuis.parser.JSStatement;
import jsuis.parser.cron.JSCronParser;
import jsuis.scanner.JSToken;
import jsuis.scanner.cron.JSCronScanner;

class JSCronSplitterTests {

	private static final JSCronSplitter CRON_SPLITTER = new JSCronSplitter(new JSCronPrinter());
	
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
		List<String> stringList = CRON_SPLITTER.visitStatement(statementList.get(0));
		System.out.println(stringList);
	}
}
