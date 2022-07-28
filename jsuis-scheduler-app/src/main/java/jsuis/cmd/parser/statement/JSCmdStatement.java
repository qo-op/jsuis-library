package jsuis.cmd.parser.statement;

import jsuis.cmd.visitor.JSCmdStatementVisitor;
import jsuis.interpreter.parser.statement.JSStatement;

/**
 * Cron statement
 * 
 * @author Yassuo Toda
 */
public abstract class JSCmdStatement implements JSStatement {

	public abstract <R> R accept(JSCmdStatementVisitor<R> visitor);
}
