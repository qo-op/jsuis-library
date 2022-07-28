package jsuis.interpreter.scanner;

/**
 * Token
 * 
 * Based on the example found at https://craftinginterpreters.com (Robert Nystrom)
 * 
 * @author Yassuo Toda
 */
public class JSToken {

	public JSTokenType tokenType;
	public String lexeme;
	public Object literal;
	public int line;
	public int column;
	
	public JSToken(JSTokenType tokenType, String lexeme, Object literal, int line, int column) {
		this.tokenType = tokenType;
		this.lexeme = lexeme;
		this.literal = literal;
		this.line = line;
		this.column = column;
	}

	@Override
	public String toString() {
		return getClass().getSimpleName() + " [tokenType=" + tokenType + ", lexeme=" + lexeme + ", literal=" + literal + ", line=" + line + ", column=" + column + "]";
	}
}
