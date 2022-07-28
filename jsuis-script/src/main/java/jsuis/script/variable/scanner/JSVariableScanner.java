package jsuis.script.variable.scanner;

import jsuis.interpreter.scanner.JSScanner;
import jsuis.interpreter.scanner.JSToken;

/**
 * Variable scanner
 * 
 * @author Yassuo Toda
 */
public class JSVariableScanner extends JSScanner {

	public JSVariableScanner(String source) {
		super(source);
	}
	
	public JSVariableScanner(String source, int line) {
		super(source);
		this.line = line;
	}
	
	@Override
	public JSToken token() {
		char c = advance();
		switch (c) {
		case '\r':
			return null;
		case '\n':
			line++;
			lineStart = start;
			return token(JSVariableTokenType.LINE_FEED);
		case '$':
			if (match('{')) {
				return token(JSVariableTokenType.DOLLAR_LEFT_BRACE);
			}
			return string();
		case '#':
			if (match('{')) {
				return token(JSVariableTokenType.HASH_LEFT_BRACE);
			}
			return string();
		case '{':
			return token(JSVariableTokenType.LEFT_BRACE);
		case '}':
			return token(JSVariableTokenType.RIGHT_BRACE);
		default:
			return string();
		}
	}
	
	public JSToken string() {
		while (!isAtEnd()) {
			char c = peek();
			if (c == '\r' || c == '\n' || c == '$' || c == '#' || c == '{' || c == '}') {
				break;
			}
			advance();
		}
		String text = source.substring(start, current);
		return token(JSVariableTokenType.STRING, text);
	}
}
