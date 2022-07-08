package jsuis.visitor.cmd;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import jsuis.parser.JSExpression;
import jsuis.parser.JSStatement;
import jsuis.parser.cmd.JSCmdExpression;
import jsuis.parser.cmd.JSCmdStatement;
import jsuis.parser.cmd.expression.JSCmdCommandExpression;
import jsuis.parser.cmd.expression.JSCmdCommandListExpression;
import jsuis.parser.cmd.statement.JSCmdCommandLineStatement;

/**
 * Cmd list printer
 * 
 * @author Yassuo Toda
 */
public class JSCmdListPrinter implements JSCmdVisitor<List<String>> {

	private boolean comments;
	
	public JSCmdListPrinter() {
		this(false);
	}
	
	public JSCmdListPrinter(boolean comments) {
		this.comments = comments;
	}
	
	public List<String> print(List<JSStatement> statementList) {
		List<String> commandList = new ArrayList<>();
		for (JSStatement statement : statementList) {
			commandList.addAll(visitStatement(statement));
		}
		return commandList;
	}
	
	@Override
	public List<String> visitCommandLineStatement(JSCmdCommandLineStatement statement) {
		List<String> commandList = new ArrayList<>();
		if (statement.expression != null) {
			commandList.addAll(visitExpression(statement.expression));
		}
		if (comments) {
			if (statement.comment != null) {
				commandList.add("# " + statement.comment);
			}
		}
		return commandList;
	}

	@Override
	public List<String> visitCommandListExpression(JSCmdCommandListExpression expression) {
		List<String> commandList = new ArrayList<>();
		for (JSExpression command : expression.commandList) {
			commandList.addAll(visitExpression(command));
		}
		return commandList;
	}

	@Override
	public List<String> visitCommandExpression(JSCmdCommandExpression expression) {
		return Arrays.asList(expression.command.toString());
	}

	@Override
	public List<String> visitStatement(JSStatement statement) {
		return ((JSCmdStatement) statement).accept(this);
	}

	@Override
	public List<String> visitExpression(JSExpression expression) {
		return ((JSCmdExpression) expression).accept(this);
	}
}
