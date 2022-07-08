package jsuis.visitor.variable;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.jupiter.api.Test;

import jsuis.parser.JSStatement;
import jsuis.parser.variable.JSVariableParser;
import jsuis.scanner.JSToken;
import jsuis.scanner.variable.JSVariableScanner;

class JSVariablePrinterTests {

	private static JSVariablePrinter VARIABLE_PRINTER = new JSVariablePrinter();
	
	@Test
	void test() {
		String text = "${greeting}, World!";
		Map<String, String> map = new HashMap<>();
		map.put("greeting", "Hello");
		JSVariableScanner variableScanner = new JSVariableScanner(text);
		List<JSToken> tokenList = variableScanner.scan();
		JSVariableParser variableParser = new JSVariableParser(tokenList);
		List<JSStatement> statementList = variableParser.parse();
		String actual = VARIABLE_PRINTER.print(statementList, map);
		String expected = "Hello, World!";
		assertEquals(expected, actual);
	}
}
