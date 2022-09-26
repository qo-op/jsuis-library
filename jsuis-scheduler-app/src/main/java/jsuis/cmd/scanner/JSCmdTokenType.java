package jsuis.cmd.scanner;

import jsuis.interpreter.scanner.JSTokenType;

/**
 * Cron token type
 * 
 * @author Yassuo Toda
 */
public enum JSCmdTokenType implements JSTokenType {

	SPACE,
	TAB,
	LINE_FEED,
	
	HASH,
	
	STRING
}
