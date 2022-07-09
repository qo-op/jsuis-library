package jsuis.cron.parser.statement;

import jsuis.cron.visitor.JSCronStatementVisitor;
import jsuis.interpreter.parser.statement.JSStatement;

/**
 * Cron statement
 * 
 * @author Yassuo Toda
 */
public abstract class JSCronStatement implements JSStatement {

	public abstract <R> R accept(JSCronStatementVisitor<R> visitor, long start, long end, int size);
}
