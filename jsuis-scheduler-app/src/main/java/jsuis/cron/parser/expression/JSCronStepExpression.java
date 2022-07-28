package jsuis.cron.parser.expression;

import jsuis.cron.parser.JSCronFieldType;
import jsuis.cron.visitor.JSCronExpressionVisitor;
import jsuis.interpreter.parser.expression.JSExpression;

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
