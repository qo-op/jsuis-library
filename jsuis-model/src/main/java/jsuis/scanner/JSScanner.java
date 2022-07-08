package jsuis.scanner;

import java.util.ArrayList;
import java.util.List;

/**
 * Scanner
 * 
 * Based on the example found at https://craftinginterpreters.com (Robert Nystrom)
 * 
 * @author Yassuo Toda
 */
public abstract class JSScanner {

	protected String source;
	protected int sourceLength = 0;
	protected int start = 0;
	protected int current = 0;
	protected int line = 1;
	protected int lineStart = start;
	
	public JSScanner(String source) {
		this.source = source;
		sourceLength = source.length();
	}
	
	public List<JSToken> scan() {
		List<JSToken> tokenList = new ArrayList<>();
		while (!isAtEnd()) {
			JSToken token = token();
			if (token != null) {
				tokenList.add(token);
			}
			start = current;
		}
		return tokenList;
	}
	
	public abstract JSToken token();
	
	public boolean match(char c) {
		if (check(c)) {
			current++;
			return true;
		}
		return false;
	}
	
	public boolean check(char c) {
		if (isAtEnd()) {
			return false;
		}
		return source.charAt(current) == c;
	}
	
	public char advance() {
		return source.charAt(current++);
	}
	
	public char peek() {
		if (isAtEnd()) {
			return '\0';
		}
		return source.charAt(current);
	}
	
	public char peekNext() {
		if (current + 1 >= sourceLength) {
			return '\0';
		} else {
			return source.charAt(current + 1);
		}
	}
	
	public boolean isAtEnd() {
		return current >= sourceLength;
	}
	
	public boolean isAlphaNumeric(char c) {
		return isAlpha(c) || isDigit(c);
	}
	
	public boolean isAlpha(char c) {
		return (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || c == '_';
	}
	
	public boolean isDigit(char c) {
		return c >= '0' && c <= '9';
	}
	
	public JSToken token(JSTokenType tokenType) {
		return token(tokenType, null);
	}
	
	public JSToken token(JSTokenType tokenType, Object literal) {
		return token(tokenType, source.substring(start, current), literal);
	}
	
	public JSToken token(JSTokenType tokenType, String lexeme, Object literal) {
		return token(tokenType, lexeme, literal, line, start - lineStart + 1);
	}
	
	public JSToken token(JSTokenType tokenType, String lexeme, Object literal, int line, int column) {
		return new JSToken(tokenType, lexeme, literal, line, column);
	}
	
	public void error(String message) {
		System.err.println("[line: " + line + ", column: " + (start - lineStart + 1) + "] Error " + source.substring(start, current) + ": " + message);
		throw new JSScannerError();
	}
}
