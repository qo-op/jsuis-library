package jsuis.visitor.cmd;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.List;

import org.junit.jupiter.api.Test;

import jsuis.cmd.parser.JSCmdParser;
import jsuis.cmd.scanner.JSCmdScanner;
import jsuis.cmd.visitor.JSCmdPrinter;
import jsuis.interpreter.parser.statement.JSStatement;
import jsuis.interpreter.scanner.JSToken;

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
