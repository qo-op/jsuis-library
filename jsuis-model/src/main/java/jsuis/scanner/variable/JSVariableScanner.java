package jsuis.scanner.variable;

import jsuis.scanner.JSScanner;
import jsuis.scanner.JSToken;

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
				return token(JSVariableTokenType.DOLAR_LEFT_BRACE);
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
			if (c == '\r' || c == '\n' || c == '$' || c == '{' || c == '}') {
				break;
			}
			advance();
		}
		String text = source.substring(start, current);
		return token(JSVariableTokenType.STRING, text);
	}
}
