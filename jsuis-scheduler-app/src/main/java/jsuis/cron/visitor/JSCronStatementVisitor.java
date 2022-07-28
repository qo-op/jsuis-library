package jsuis.cron.visitor;

import jsuis.cron.parser.statement.JSCronScheduledJobStatement;
import jsuis.cron.parser.statement.JSCronStatement;

/**
 * Cron statement visitor
 * 
 * @author Yassuo Toda
 */
public interface JSCronStatementVisitor<R> {

	public R visitScheduledJobStatement(JSCronScheduledJobStatement statement, long start, long end, int size);
	
	public R visitStatement(JSCronStatement statement, long start, long end, int size);
}
