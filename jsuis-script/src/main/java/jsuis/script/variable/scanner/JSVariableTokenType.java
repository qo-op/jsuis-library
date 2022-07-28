package jsuis.script.variable.scanner;

import jsuis.interpreter.scanner.JSTokenType;

/**
 * Variable token type
 * 
 * @author Yassuo Toda
 */
public enum JSVariableTokenType implements JSTokenType {

	LINE_FEED,
	
	DOLLAR_LEFT_BRACE,
	HASH_LEFT_BRACE,
	LEFT_BRACE,
	RIGHT_BRACE,
	
	STRING
}
