package jsuis.parser.cmd.statement;

import jsuis.parser.JSExpression;
import jsuis.parser.cmd.JSCmdStatement;
import jsuis.visitor.cmd.JSCmdStatementVisitor;

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
