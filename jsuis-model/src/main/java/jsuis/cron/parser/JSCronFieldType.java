package jsuis.cron.parser;

import jsuis.interpreter.scanner.JSTokenType;

/**
 * Cron token type
 * 
 * @author Yassuo Toda
 */
public enum JSCronFieldType implements JSTokenType {

	MINUTE,
	HOUR,
	DAY_OF_MONTH,
	MONTH,
	DAY_OF_WEEK,
	YEAR
}
