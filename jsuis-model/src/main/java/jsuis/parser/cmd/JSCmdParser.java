package jsuis.parser.cmd;

import java.util.ArrayList;
import java.util.List;

import jsuis.parser.JSExpression;
import jsuis.parser.JSParser;
import jsuis.parser.JSStatement;
import jsuis.parser.cmd.expression.JSCmdCommandExpression;
import jsuis.parser.cmd.expression.JSCmdCommandListExpression;
import jsuis.parser.cmd.statement.JSCmdCommandLineStatement;
import jsuis.scanner.JSToken;
import jsuis.scanner.cmd.JSCmdTokenType;

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
			consume(JSCmdTokenType.LINE_FEED, "Expected '\n' after statement");
		}
		return new JSCmdCommandLineStatement(expression, comment);
	}

	// expression ::= command ( ( SPACE | TAB ) + command ) * ( SPACE | TAB ) *
	@Override
	public JSExpression expression() {
		List<JSExpression> commandList = new ArrayList<>();
		commandList.add(command());
		while (match(JSCmdTokenType.SPACE, JSCmdTokenType.TAB)) {
			while (match(JSCmdTokenType.SPACE, JSCmdTokenType.TAB)) {
			}
			if (!match(JSCmdTokenType.STRING)) {
				break;
			}
			commandList.add(command());
		}
		return new JSCmdCommandListExpression(commandList);
	}
	
	// command ::= STRING +
	public JSExpression command() {
		StringBuffer command = new StringBuffer();
		command.append(previous().literal);
		while (match(JSCmdTokenType.STRING)) {
			command.append(previous().literal);
		}
		return new JSCmdCommandExpression(command.toString());
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
