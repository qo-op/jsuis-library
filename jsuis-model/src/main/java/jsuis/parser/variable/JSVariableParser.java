package jsuis.parser.variable;

import java.util.ArrayList;
import java.util.List;

import jsuis.parser.JSExpression;
import jsuis.parser.JSParser;
import jsuis.parser.JSStatement;
import jsuis.parser.variable.expression.JSVariableBlockExpression;
import jsuis.parser.variable.expression.JSVariableCompoundExpression;
import jsuis.parser.variable.expression.JSVariableScriptExpression;
import jsuis.parser.variable.statement.JSVariableLineStatement;
import jsuis.scanner.JSToken;
import jsuis.scanner.variable.JSVariableTokenType;

/**
 * Variable parser
 * 
 * @author Yassuo Toda
 */
public class JSVariableParser extends JSParser {

	public JSVariableParser(List<JSToken> tokenList) {
		super(tokenList);
	}

	// statement ::= ( LEFT_BRACE | RIGHT_BRACE | STRING ) * expression * ( LINE_FEED | EOF )
	@Override
	public JSStatement statement() {
		StringBuffer left = new StringBuffer();
		while (match(JSVariableTokenType.LEFT_BRACE, JSVariableTokenType.RIGHT_BRACE, JSVariableTokenType.STRING)) {
			left.append(previous().literal);
		}
		List<JSExpression> expressionList = new ArrayList<>();
		if (match(JSVariableTokenType.DOLAR_LEFT_BRACE)) {
			expressionList.add(expression());
		}
		if (!isAtEnd()) {
			consume(JSVariableTokenType.LINE_FEED, "Expected '\n' after statement");
		}
		return new JSVariableLineStatement(left.toString(), expressionList);
	}

	// expression ::= DOLAR_LEFT_BRACE script RIGHT_BRACE ( LEFT_BRACE | RIGHT_BRACE | STRING ) *
	@Override
	public JSExpression expression() {
		JSExpression script = script();
		consume(JSVariableTokenType.RIGHT_BRACE, "Expected '}' after script");
		StringBuffer right = new StringBuffer();
		while (match(JSVariableTokenType.LEFT_BRACE, JSVariableTokenType.RIGHT_BRACE, JSVariableTokenType.STRING)) {
			right.append(previous().literal);
		}
		return new JSVariableCompoundExpression(script, right.toString());
	}

	// script ::= ( DOLAR_LEFT_BRACE script RIGHT_BRACE | LEFT_BRACE block RIGHT_BRACE | STRING ) *
	public JSExpression script() {
		List<Object> list = new ArrayList<>();
		while (match(JSVariableTokenType.DOLAR_LEFT_BRACE, JSVariableTokenType.LEFT_BRACE, JSVariableTokenType.STRING)) {
			JSToken previous = previous();
			JSVariableTokenType tokenType = (JSVariableTokenType) previous.tokenType;
			switch (tokenType) {
			case DOLAR_LEFT_BRACE:
				list.add(script());
				consume(JSVariableTokenType.RIGHT_BRACE, "Expected '}' after script");
				break;
			case LEFT_BRACE:
				list.add(block());
				consume(JSVariableTokenType.RIGHT_BRACE, "Expected '}' after block");
				break;
			case STRING:
				list.add(previous.literal);
				break;
			default:
			}
		}
		return new JSVariableScriptExpression(list);
	}
	
	// block ::= ( DOLAR_LEFT_BRACE script RIGHT_BRACE | LEFT_BRACE block RIGHT_BRACE | STRING ) *
	public JSExpression block() {
		List<Object> list = new ArrayList<>();
		while (match(JSVariableTokenType.DOLAR_LEFT_BRACE, JSVariableTokenType.LEFT_BRACE, JSVariableTokenType.STRING)) {
			JSToken previous = previous();
			JSVariableTokenType tokenType = (JSVariableTokenType) previous.tokenType;
			switch (tokenType) {
			case DOLAR_LEFT_BRACE:
				list.add(script());
				consume(JSVariableTokenType.RIGHT_BRACE, "Expected '}' after script");
				break;
			case LEFT_BRACE:
				list.add(block());
				consume(JSVariableTokenType.RIGHT_BRACE, "Expected '}' after block");
				break;
			case STRING:
				list.add(previous.literal);
				break;
			default:
			}
		}
		return new JSVariableBlockExpression(list);
	}
}
