package jsuis.cron.scanner;

import java.util.HashMap;
import java.util.Map;

import jsuis.interpreter.scanner.JSScanner;
import jsuis.interpreter.scanner.JSToken;
import jsuis.interpreter.scanner.JSTokenType;

/**
 * Cron scanner
 * 
 * @author Yassuo Toda
 */
public class JSCronScanner extends JSScanner {

	public JSCronScanner(String source) {
		super(source);
	}
	
	public JSCronScanner(String source, int line) {
		super(source);
		this.line = line;
	}
	
	@Override
	public JSToken token() {
		char c = advance();
		switch (c) {
		case ' ':
			return token(JSCronTokenType.SPACE);
		case '\t':
			return token(JSCronTokenType.TAB);
		case '\r':
			return null;
		case '\n':
			line++;
			lineStart = start;
			return token(JSCronTokenType.LINE_FEED);
		case '#':
			return token(JSCronTokenType.HASH);
		case '*':
			return token(JSCronTokenType.ASTERISK);
		case ',':
			return token(JSCronTokenType.COMMA);
		case '-':
			return token(JSCronTokenType.DASH);
		case '/':
			return token(JSCronTokenType.SLASH);
		case '+':
			return token(JSCronTokenType.PLUS);
		case 'L':
			return token(JSCronTokenType.L);
		case 'W':
			return token(JSCronTokenType.W);
		case 'D':
			return token(JSCronTokenType.D);
		case '~':
			return token(JSCronTokenType.TILDE);
		default:
			if (isDigit(c)) {
				return number();
			} else {
				return string();
			}
		}
	}
	
	public JSToken number() {
		while (!isAtEnd() && isDigit(peek())) {
			advance();
		}
		return token(JSCronTokenType.NUMBER, Integer.parseInt(source.substring(start, current)));
	}
	
	public JSToken string() {
		while (!isAtEnd()) {
			char c = peek();
			if (c == ' ' || c == '\t' || c == '\r' || c == '\n' || c == '#' || c == '*' || c == ',' || c == '-' || c == '/' || c == '+' || c == 'L' || c == 'W' || c == 'D' || c == '~') {
				break;
			}
			advance();
		}
		String text = source.substring(start, current);
		JSToken token = token(text);
		if (token != null) {
			return token;
		}
		return token(JSCronTokenType.STRING, text);
	}
	
	public JSToken token(String text) {
		JSTokenType tokenType = getTokenType(text);
		if (tokenType == null) {
			return null;
		}
		return token(tokenType);
	}
	
	private static Map<String, JSTokenType> tokenTypeMap = new HashMap<>();
	private static Map<JSTokenType, String> tokenStringMap = new HashMap<>();
	
	public static void addTokenType(String text, JSTokenType tokenType) {
		tokenTypeMap.put(text, tokenType);
		tokenStringMap.put(tokenType, text);
	}
	
	public static JSTokenType getTokenType(String text) {
		return tokenTypeMap.get(text);
	}
	
	public static String getTokenString(JSTokenType tokenType) {
		return tokenStringMap.get(tokenType);
	}
	
	static {
		addTokenType("SUN", JSCronTokenType.SUN);
		addTokenType("MON", JSCronTokenType.MON);
		addTokenType("TUE", JSCronTokenType.TUE);
		addTokenType("WED", JSCronTokenType.WED);
		addTokenType("THU", JSCronTokenType.THU);
		addTokenType("FRI", JSCronTokenType.FRI);
		addTokenType("SAT", JSCronTokenType.SAT);
		addTokenType("@reboot", JSCronTokenType.REBOOT);
		addTokenType("@yearly", JSCronTokenType.YEARLY);
		addTokenType("@annually", JSCronTokenType.ANNUALLY);
		addTokenType("@monthly", JSCronTokenType.MONTHLY);
		addTokenType("@weekly", JSCronTokenType.WEEKLY);
		addTokenType("@daily", JSCronTokenType.DAILY);
		addTokenType("@midnight", JSCronTokenType.MIDNIGHT);
		addTokenType("@hourly", JSCronTokenType.HOURLY);
	}
}
