package jsuis.visitor.cmd;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.List;

import org.junit.jupiter.api.Test;

import jsuis.parser.JSStatement;
import jsuis.parser.cmd.JSCmdParser;
import jsuis.scanner.JSToken;
import jsuis.scanner.cmd.JSCmdScanner;

class JSCmdPrinterTests {

	private static final JSCmdPrinter CMD_PRINTER = new JSCmdPrinter();
	
	@Test
	void test() {
		String command = "\"C:\\Program Files\\Java\\java.exe\" -version";
		JSCmdScanner cmdScanner = new JSCmdScanner(command);
		List<JSToken> tokenList = cmdScanner.scan();
		JSCmdParser cmdParser = new JSCmdParser(tokenList);
		List<JSStatement> statementList = cmdParser.parse();
		String expected = command;
		String actual = CMD_PRINTER.print(statementList);
		assertEquals(expected, actual);
	}
}
