package jsuis.cmd.visitor;

import java.util.List;

import jsuis.cmd.parser.expression.JSCmdCommandExpression;
import jsuis.cmd.parser.expression.JSCmdExpression;
import jsuis.cmd.parser.expression.JSCmdTextExpression;
import jsuis.cmd.parser.statement.JSCmdCommandLineStatement;
import jsuis.cmd.parser.statement.JSCmdStatement;
import jsuis.interpreter.parser.expression.JSExpression;
import jsuis.interpreter.parser.statement.JSStatement;

/**
 * Cmd printer
 * 
 * @author Yassuo Toda
 */
public class JSCmdPrinter implements JSCmdVisitor<String> {

	public String print(List<JSStatement> statementList) {
		int size = statementList.size();
		if (size == 0) {
			return "";
		}
		StringBuffer text = new StringBuffer();
		text.append(visitStatement((JSCmdStatement) statementList.get(0)));
		for (int i = 1; i < size; i++) {
			text.append("\n").append(visitStatement((JSCmdStatement) statementList.get(i)));
		}
		return text.toString();
	}
	
	@Override
	public String visitCommandLineStatement(JSCmdCommandLineStatement statement) {
		StringBuffer text = new StringBuffer();
		if (statement.expression != null) {
			text.append(visitExpression((JSCmdExpression) statement.expression));
		}
		if (statement.comment != null) {
			text.append(" #").append(statement.comment);
		}
		return text.toString().trim();
	}

	@Override
	public String visitCommandExpression(JSCmdCommandExpression expression) {
		List<JSExpression> textList = expression.textExpressionList;
		int size = textList.size();
		if (size == 0) {
			return "";
		}
		StringBuffer text = new StringBuffer();
		text.append(visitExpression((JSCmdExpression) textList.get(0)));
		for (int i = 1; i < size; i++) {
			text.append(" ").append(visitExpression((JSCmdExpression) textList.get(i)));
		}
		return text.toString();
	}

	@Override
	public String visitTextExpression(JSCmdTextExpression expression) {
		if (expression.text.contains(" ")) {
			return "\"" + expression.text.replace("\"", "\"\"") + "\"";
		}
		return expression.text;
	}

	@Override
	public String visitStatement(JSCmdStatement statement) {
		return statement.accept(this);
	}

	@Override
	public String visitExpression(JSCmdExpression expression) {
		return expression.accept(this);
	}
}
