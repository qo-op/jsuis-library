package jsuis.parser.cron;

import jsuis.parser.JSStatement;
import jsuis.visitor.cron.JSCronStatementVisitor;

/**
 * Cron statement
 * 
 * @author Yassuo Toda
 */
public abstract class JSCronStatement implements JSStatement {

	public abstract <R> R accept(JSCronStatementVisitor<R> visitor, long start, long end, int size);
}
