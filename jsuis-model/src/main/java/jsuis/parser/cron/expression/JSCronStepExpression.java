package jsuis.parser.cron.expression;

import jsuis.parser.JSExpression;
import jsuis.parser.cron.JSCronExpression;
import jsuis.parser.cron.JSCronFieldType;
import jsuis.visitor.cron.JSCronExpressionVisitor;

/**
 * Cron step
 * 
 * @author Yassuo Toda
 */
public class JSCronStepExpression extends JSCronExpression {

	public JSExpression expression;
	public int step;
	public JSCronFieldType fieldType;
	
	public JSCronStepExpression(JSExpression expression, int step, JSCronFieldType fieldType) {
		this.expression = expression;
		this.step = step;
		this.fieldType = fieldType;
	}

	@Override
	public <R> R accept(JSCronExpressionVisitor<R> visitor, long start, long end, int size, int months) {
		return visitor.visitStepExpression(this, start, end, size, months);
	}
}
