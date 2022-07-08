package jsuis.parser.cmd;

import jsuis.parser.JSStatement;
import jsuis.visitor.cmd.JSCmdStatementVisitor;

/**
 * Cron statement
 * 
 * @author Yassuo Toda
 */
public abstract class JSCmdStatement implements JSStatement {

	public abstract <R> R accept(JSCmdStatementVisitor<R> visitor);
}
