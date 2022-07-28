package jsuis.cmd.scanner;

import jsuis.interpreter.scanner.JSScanner;
import jsuis.interpreter.scanner.JSToken;

/**
 * Cron scanner
 * 
 * @author Yassuo Toda
 */
public class JSCmdScanner extends JSScanner {

	public JSCmdScanner(String source) {
		super(source);
	}
	
	public JSCmdScanner(String source, int line) {
		super(source);
		this.line = line;
	}
	
	@Override
	public JSToken token() {
		char c = advance();
		switch (c) {
		case ' ':
			return token(JSCmdTokenType.SPACE);
		case '\t':
			return token(JSCmdTokenType.TAB);
		case '\r':
			return null;
		case '\n':
			line++;
			lineStart = start;
			return token(JSCmdTokenType.LINE_FEED);
		case '#':
			return token(JSCmdTokenType.HASH);
		case '\"':
			return quotes();
		default:
			return string();
		}
	}
	
	public JSToken string() {
		while (!isAtEnd()) {
			char c = peek();
			if (c == ' ' || c == '\t' || c == '\r' || c == '\n' || c == '#' || c == '\"') {
				break;
			}
			advance();
		}
		String text = source.substring(start, current);
		return token(JSCmdTokenType.STRING, text);
	}
	
	public JSToken quotes() {
		while (!isAtEnd()) {
			char c = peek();
			if (c == '\r' || c == '\n') {
				error("Unterminated string.");
			}
			if (c == '\"') {
				if (peekNext() != '\"') {
					break;
				}
				advance();
			}
			advance();
		}
		if (isAtEnd()) {
			error("Unterminated string.");
		}
		advance();
		String text = source.substring(start + 1, current - 1);
		return token(JSCmdTokenType.STRING, text);
	}
}
