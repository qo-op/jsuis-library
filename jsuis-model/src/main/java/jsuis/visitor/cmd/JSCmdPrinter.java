package jsuis.visitor.cmd;

import java.util.List;

import jsuis.parser.JSExpression;
import jsuis.parser.JSStatement;
import jsuis.parser.cmd.JSCmdExpression;
import jsuis.parser.cmd.JSCmdStatement;
import jsuis.parser.cmd.expression.JSCmdCommandExpression;
import jsuis.parser.cmd.expression.JSCmdCommandListExpression;
import jsuis.parser.cmd.statement.JSCmdCommandLineStatement;

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
		text.append(visitStatement(statementList.get(0)));
		for (int i = 1; i < size; i++) {
			text.append("\n").append(visitStatement(statementList.get(i)));
		}
		return text.toString();
	}
	
	@Override
	public String visitCommandLineStatement(JSCmdCommandLineStatement statement) {
		StringBuffer text = new StringBuffer();
		if (statement.expression != null) {
			text.append(visitExpression(statement.expression));
		}
		if (statement.comment != null) {
			text.append(" #").append(statement.comment);
		}
		return text.toString().trim();
	}

	@Override
	public String visitCommandListExpression(JSCmdCommandListExpression expression) {
		List<JSExpression> commandList = expression.commandList;
		int size = commandList.size();
		if (size == 0) {
			return "";
		}
		StringBuffer text = new StringBuffer();
		text.append(visitExpression(commandList.get(0)));
		for (int i = 1; i < size; i++) {
			text.append(" ").append(visitExpression(commandList.get(i)));
		}
		return text.toString();
	}

	@Override
	public String visitCommandExpression(JSCmdCommandExpression expression) {
		if (expression.command.contains(" ")) {
			return "\"" + expression.command.replace("\"", "\"\"") + "\"";
		}
		return expression.command;
	}

	@Override
	public String visitStatement(JSStatement statement) {
		return ((JSCmdStatement) statement).accept(this);
	}

	@Override
	public String visitExpression(JSExpression expression) {
		return ((JSCmdExpression) expression).accept(this);
	}
}
