package jsuis.cmd.parser;

import java.util.ArrayList;
import java.util.List;

import jsuis.cmd.parser.expression.JSCmdCommandExpression;
import jsuis.cmd.parser.expression.JSCmdTextExpression;
import jsuis.cmd.parser.statement.JSCmdCommandLineStatement;
import jsuis.cmd.scanner.JSCmdTokenType;
import jsuis.interpreter.parser.JSParser;
import jsuis.interpreter.parser.expression.JSExpression;
import jsuis.interpreter.parser.statement.JSStatement;
import jsuis.interpreter.scanner.JSToken;

/**
 * Cmd parser
 * 
 * @author Yassuo Toda
 */
public class JSCmdParser extends JSParser {

	public JSCmdParser(List<JSToken> tokenList) {
		super(tokenList);
	}

	// statement ::= ( SPACE | TAB ) * expression ? ( HASH comment ) ? ( LINE_FEED | EOF )
	@Override
	public JSStatement statement() {
		while (match(JSCmdTokenType.SPACE, JSCmdTokenType.TAB)) {
		}
		JSExpression expression = null;
		String comment = null;
		if (match(JSCmdTokenType.STRING)) {
			expression = expression();
		}
		if (match(JSCmdTokenType.HASH)) {
			comment = comment();
		}
		if (!isAtEnd()) {
			consume(JSCmdTokenType.LINE_FEED, "Expected '\\n' after statement.");
		}
		return new JSCmdCommandLineStatement(expression, comment);
	}

	// expression ::= command ( ( SPACE | TAB ) + command ) * ( SPACE | TAB ) *
	@Override
	public JSExpression expression() {
		List<JSExpression> textList = new ArrayList<>();
		textList.add(command());
		while (match(JSCmdTokenType.SPACE, JSCmdTokenType.TAB)) {
			while (match(JSCmdTokenType.SPACE, JSCmdTokenType.TAB)) {
			}
			if (!match(JSCmdTokenType.STRING)) {
				break;
			}
			textList.add(command());
		}
		return new JSCmdCommandExpression(textList);
	}
	
	// command ::= STRING +
	public JSExpression command() {
		StringBuffer command = new StringBuffer();
		command.append(previous().literal);
		while (match(JSCmdTokenType.STRING)) {
			command.append(previous().literal);
		}
		return new JSCmdTextExpression(command.toString());
	}
	
	// comment ::= ( SPACE | TAB | HASH | STRING ) *
	public String comment() {
		StringBuffer comment = new StringBuffer();
		while (match(JSCmdTokenType.SPACE, JSCmdTokenType.TAB, JSCmdTokenType.HASH, JSCmdTokenType.STRING)) {
			comment.append(advance().lexeme); 
		}
		return comment.toString();
	}
}
