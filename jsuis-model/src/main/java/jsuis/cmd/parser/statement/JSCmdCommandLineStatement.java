package jsuis.cmd.parser.statement;

import jsuis.cmd.visitor.JSCmdStatementVisitor;
import jsuis.interpreter.parser.expression.JSExpression;

/**
 * Cmd command line statement
 * 
 * @author Yassuo Toda
 */
public class JSCmdCommandLineStatement extends JSCmdStatement {
	
	public JSExpression expression;
	public String comment;
	
	public JSCmdCommandLineStatement(JSExpression expression, String comment) {
		this.expression = expression;
		this.comment = comment;
	}

	@Override
	public <R> R accept(JSCmdStatementVisitor<R> visitor) {
		return visitor.visitCommandLineStatement(this);
	}
}
