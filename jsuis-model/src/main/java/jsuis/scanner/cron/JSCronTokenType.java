package jsuis.scanner.cron;

import jsuis.scanner.JSTokenType;

/**
 * Cron token type
 * 
 * @author Yassuo Toda
 */
public enum JSCronTokenType implements JSTokenType {

	SPACE,
	TAB,
	LINE_FEED,
	
	HASH,
	ASTERISK,
	COMMA,
	DASH,
	SLASH,
	PLUS,
	L,
	W,
	D,
	TILDE,
	
	SUN,
	MON,
	TUE,
	WED,
	THU,
	FRI,
	SAT,
	
	REBOOT,
	YEARLY,
	ANNUALLY,
	MONTHLY,
	WEEKLY,
	DAILY,
	MIDNIGHT,
	HOURLY,
	
	NUMBER,
	STRING
}
