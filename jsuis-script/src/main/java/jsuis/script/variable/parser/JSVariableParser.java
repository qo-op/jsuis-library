package jsuis.script.variable.parser;

import java.util.ArrayList;
import java.util.List;

import jsuis.interpreter.parser.JSParser;
import jsuis.interpreter.parser.expression.JSExpression;
import jsuis.interpreter.parser.statement.JSStatement;
import jsuis.interpreter.scanner.JSToken;
import jsuis.script.variable.parser.expression.JSVariableBlockExpression;
import jsuis.script.variable.parser.expression.JSVariableCompoundExpression;
import jsuis.script.variable.parser.expression.JSVariableDollarExpression;
import jsuis.script.variable.parser.expression.JSVariableHashExpression;
import jsuis.script.variable.parser.statement.JSVariableLineStatement;
import jsuis.script.variable.scanner.JSVariableTokenType;

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
			left.append(previous().lexeme);
		}
		List<JSExpression> expressionList = new ArrayList<>();
		while (match(JSVariableTokenType.DOLLAR_LEFT_BRACE, JSVariableTokenType.HASH_LEFT_BRACE)) {
			expressionList.add(expression());
		}
		if (!isAtEnd()) {
			consume(JSVariableTokenType.LINE_FEED, "Expected '\\n' after statement.");
		}
		return new JSVariableLineStatement(left.toString(), expressionList);
	}

	// expression ::= ( DOLLAR_LEFT_BRACE | HASH_LEFT_BRACE ) script RIGHT_BRACE ( LEFT_BRACE | RIGHT_BRACE | STRING ) *
	@Override
	public JSExpression expression() {
		JSExpression expression;
		if (previous().tokenType == JSVariableTokenType.DOLLAR_LEFT_BRACE) {
			expression = dollar();
		} else {
			expression = hash();
		}
		consume(JSVariableTokenType.RIGHT_BRACE, "Expected '}' after script.");
		StringBuffer right = new StringBuffer();
		while (match(JSVariableTokenType.LEFT_BRACE, JSVariableTokenType.RIGHT_BRACE, JSVariableTokenType.STRING)) {
			right.append(previous().lexeme);
		}
		return new JSVariableCompoundExpression(expression, right.toString());
	}

	// dollar ::= ( ( DOLLAR_LEFT_BRACE | HASH_LEFT_BRACE ) script RIGHT_BRACE | LEFT_BRACE block RIGHT_BRACE | STRING ) *
	public JSExpression dollar() {
		List<Object> list = new ArrayList<>();
		while (match(JSVariableTokenType.DOLLAR_LEFT_BRACE, JSVariableTokenType.HASH_LEFT_BRACE, JSVariableTokenType.LEFT_BRACE, JSVariableTokenType.STRING)) {
			JSToken previous = previous();
			JSVariableTokenType tokenType = (JSVariableTokenType) previous.tokenType;
			switch (tokenType) {
			case DOLLAR_LEFT_BRACE:
				list.add(dollar());
				consume(JSVariableTokenType.RIGHT_BRACE, "Expected '}' after '${ ... '.");
				break;
			case HASH_LEFT_BRACE:
				list.add(hash());
				consume(JSVariableTokenType.RIGHT_BRACE, "Expected '}' after '#{ ... '.");
				break;
			case LEFT_BRACE:
				list.add(block());
				consume(JSVariableTokenType.RIGHT_BRACE, "Expected '}' after '{ ... '.");
				break;
			case STRING:
				list.add(previous.literal);
				break;
			default:
			}
		}
		return new JSVariableDollarExpression(list);
	}

	// hash ::= ( ( DOLLAR_LEFT_BRACE | HASH_LEFT_BRACE ) script RIGHT_BRACE | LEFT_BRACE block RIGHT_BRACE | STRING ) *
	public JSExpression hash() {
		List<Object> list = new ArrayList<>();
		while (match(JSVariableTokenType.DOLLAR_LEFT_BRACE, JSVariableTokenType.HASH_LEFT_BRACE, JSVariableTokenType.LEFT_BRACE, JSVariableTokenType.STRING)) {
			JSToken previous = previous();
			JSVariableTokenType tokenType = (JSVariableTokenType) previous.tokenType;
			switch (tokenType) {
			case DOLLAR_LEFT_BRACE:
				list.add(dollar());
				consume(JSVariableTokenType.RIGHT_BRACE, "Expected '}' after '${ ... '.");
				break;
			case HASH_LEFT_BRACE:
				list.add(hash());
				consume(JSVariableTokenType.RIGHT_BRACE, "Expected '}' after '#{ ... '.");
				break;
			case LEFT_BRACE:
				list.add(block());
				consume(JSVariableTokenType.RIGHT_BRACE, "Expected '}' after '{ ... '.");
				break;
			case STRING:
				list.add(previous.literal);
				break;
			default:
			}
		}
		return new JSVariableHashExpression(list);
	}
	
	// block ::= ( DOLLAR_LEFT_BRACE script RIGHT_BRACE | LEFT_BRACE block RIGHT_BRACE | STRING ) *
	public JSExpression block() {
		List<Object> list = new ArrayList<>();
		while (match(JSVariableTokenType.DOLLAR_LEFT_BRACE, JSVariableTokenType.LEFT_BRACE, JSVariableTokenType.STRING)) {
			JSToken previous = previous();
			JSVariableTokenType tokenType = (JSVariableTokenType) previous.tokenType;
			switch (tokenType) {
			case DOLLAR_LEFT_BRACE:
				list.add(dollar());
				consume(JSVariableTokenType.RIGHT_BRACE, "Expected '}' after '${ ... '.");
				break;
			case HASH_LEFT_BRACE:
				list.add(hash());
				consume(JSVariableTokenType.RIGHT_BRACE, "Expected '}' after '#{ ... '.");
				break;
			case LEFT_BRACE:
				list.add(block());
				consume(JSVariableTokenType.RIGHT_BRACE, "Expected '}' after '{ ... '.");
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
