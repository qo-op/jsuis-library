package jsuis.cmd.visitor;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import jsuis.cmd.parser.expression.JSCmdCommandExpression;
import jsuis.cmd.parser.expression.JSCmdExpression;
import jsuis.cmd.parser.expression.JSCmdTextExpression;
import jsuis.cmd.parser.statement.JSCmdCommandLineStatement;
import jsuis.cmd.parser.statement.JSCmdStatement;
import jsuis.interpreter.parser.expression.JSExpression;
import jsuis.interpreter.parser.statement.JSStatement;

/**
 * Cmd list printer
 * 
 * @author Yassuo Toda
 */
public class JSCmdTextListPrinter implements JSCmdVisitor<List<String>> {

	private boolean comments;
	
	public JSCmdTextListPrinter() {
		this(false);
	}
	
	public JSCmdTextListPrinter(boolean comments) {
		this.comments = comments;
	}
	
	public List<String> print(List<JSStatement> statementList) {
		List<String> textList = new ArrayList<>();
		for (JSStatement statement : statementList) {
			textList.addAll(visitStatement((JSCmdStatement) statement));
		}
		return textList;
	}
	
	@Override
	public List<String> visitCommandLineStatement(JSCmdCommandLineStatement statement) {
		List<String> textList = new ArrayList<>();
		if (statement.expression != null) {
			textList.addAll(visitExpression((JSCmdExpression) statement.expression));
		}
		if (comments) {
			if (statement.comment != null) {
				textList.add("# " + statement.comment);
			}
		}
		return textList;
	}

	@Override
	public List<String> visitCommandExpression(JSCmdCommandExpression expression) {
		List<String> textList = new ArrayList<>();
		for (JSExpression textExpression : expression.textExpressionList) {
			textList.addAll(visitExpression((JSCmdExpression) textExpression));
		}
		return textList;
	}

	@Override
	public List<String> visitTextExpression(JSCmdTextExpression expression) {
		return Arrays.asList(expression.text);
	}

	@Override
	public List<String> visitStatement(JSCmdStatement statement) {
		return statement.accept(this);
	}

	@Override
	public List<String> visitExpression(JSCmdExpression expression) {
		return expression.accept(this);
	}
}
