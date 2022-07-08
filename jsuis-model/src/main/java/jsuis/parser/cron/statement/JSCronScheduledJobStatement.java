package jsuis.parser.cron.statement;

import jsuis.parser.JSExpression;
import jsuis.parser.cron.JSCronStatement;
import jsuis.visitor.cron.JSCronStatementVisitor;

/**
 * Cron scheduled job
 * 
 * @author Yassuo Toda
 */
public class JSCronScheduledJobStatement extends JSCronStatement {

	public JSExpression expression;
	public String command;
	
	public JSCronScheduledJobStatement(JSExpression expression, String command) {
		this.expression = expression;
		this.command = command;
	}
	
	@Override
	public <R> R accept(JSCronStatementVisitor<R> visitor, long start, long end, int size) {
		return visitor.visitScheduledJobStatement(this, start, end, size);
	}
}
