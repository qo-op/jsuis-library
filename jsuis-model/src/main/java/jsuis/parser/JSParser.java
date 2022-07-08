package jsuis.parser;

import java.util.ArrayList;
import java.util.List;

import jsuis.scanner.JSToken;
import jsuis.scanner.JSTokenType;

/**
 * Parser
 * 
 * Based on the example found at https://craftinginterpreters.com (Robert Nystrom)
 * 
 * @author Yassuo Toda
 */
public abstract class JSParser {

	protected List<JSToken> tokenList;
	protected int tokenCount = 0;
	protected int current = 0;
	
	public JSParser(List<JSToken> tokenList) {
		this.tokenList = tokenList;
		tokenCount = tokenList.size();
	}
	
	public List<JSStatement> parse() {
		List<JSStatement> statementList = new ArrayList<>();
		while (!isAtEnd()) {
			statementList.add(statement());
		}
		return statementList;
	}
	
	public abstract JSStatement statement();
	
	public abstract JSExpression expression();
	
	public boolean match(JSTokenType... tokenTypes) {
		for (JSTokenType tokenType : tokenTypes) {
			if (check(tokenType)) {
				current++;
				return true;
			}
		}
		return false;
	}
	
	public JSToken consume(JSTokenType tokenType, String message) {
		if (check(tokenType)) {
			return advance();
		}
		throw error(peek(), message);
	}
	
	public JSToken consume(List<JSTokenType> tokenTypeList, String message) {
		for (JSTokenType tokenType : tokenTypeList) {
			if (check(tokenType)) {
				return advance();
			}
		}
		throw error(peek(), message);
	}
	
	public boolean check(JSTokenType tokenType) {
		if (isAtEnd()) {
			return false;
		}
		return peek().tokenType == tokenType;
	}
	
	public JSToken advance() {
		return tokenList.get(current++);
	}
	
	public JSToken peek() {
		return tokenList.get(current);
	}
	
	public JSToken previous() {
		return tokenList.get(current - 1);
	}
	
	public boolean isAtEnd() {
		return current >= tokenCount;
	}
	
	public JSParseError error(JSToken token, String message) {
		System.err.println("[line: " + token.line + ", column: " + token.column + "] Error " + token.lexeme + ": " + message);
		throw new JSParseError();
	}
}
