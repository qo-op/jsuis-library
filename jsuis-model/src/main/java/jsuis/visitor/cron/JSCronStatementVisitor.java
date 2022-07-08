package jsuis.visitor.cron;

import jsuis.parser.JSStatement;
import jsuis.parser.cron.statement.JSCronScheduledJobStatement;
import jsuis.visitor.JSStatementVisitor;

/**
 * Cron statement visitor
 * 
 * @author Yassuo Toda
 */
public interface JSCronStatementVisitor<R> extends JSStatementVisitor<R> {

	public R visitScheduledJobStatement(JSCronScheduledJobStatement statement, long start, long end, int size);
	
	public R visitStatement(JSStatement statement, long start, long end, int size);
}
