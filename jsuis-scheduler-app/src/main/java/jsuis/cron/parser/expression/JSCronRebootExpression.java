package jsuis.cron.parser.expression;

import jsuis.cron.visitor.JSCronExpressionVisitor;

/**
 * Cron reboot
 * 
 * @author Yassuo Toda
 */
public class JSCronRebootExpression extends JSCronExpression {

	@Override
	public <R> R accept(JSCronExpressionVisitor<R> visitor, long start, long end, int size, int months) {
		return visitor.visitRebootExpression(this);
	}
}
