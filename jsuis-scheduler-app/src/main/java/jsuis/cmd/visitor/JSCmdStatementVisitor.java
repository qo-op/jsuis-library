package jsuis.cmd.visitor;

import jsuis.cmd.parser.statement.JSCmdCommandLineStatement;
import jsuis.cmd.parser.statement.JSCmdStatement;

/**
 * Cmd statement visitor
 * 
 * @author Yassuo Toda
 */
public interface JSCmdStatementVisitor<R> {

	public R visitCommandLineStatement(JSCmdCommandLineStatement statement);
	
	public R visitStatement(JSCmdStatement statement);
}
