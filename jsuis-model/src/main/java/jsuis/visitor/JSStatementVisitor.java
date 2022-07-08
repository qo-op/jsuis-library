package jsuis.visitor;

import jsuis.parser.JSStatement;

/**
 * Cron statement visitor
 * 
 * @author Yassuo Toda
 */
public interface JSStatementVisitor<R> {

	public R visitStatement(JSStatement statement);
}
