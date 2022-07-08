package jsuis.visitor.cmd;

import jsuis.parser.cmd.statement.JSCmdCommandLineStatement;
import jsuis.visitor.JSStatementVisitor;

/**
 * Cmd statement visitor
 * 
 * @author Yassuo Toda
 */
public interface JSCmdStatementVisitor<R> extends JSStatementVisitor<R> {

	public R visitCommandLineStatement(JSCmdCommandLineStatement statement);
}
