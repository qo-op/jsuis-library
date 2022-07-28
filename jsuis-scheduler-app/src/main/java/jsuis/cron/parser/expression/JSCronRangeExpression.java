package jsuis.cron.parser.expression;

import jsuis.cron.parser.JSCronFieldType;
import jsuis.cron.visitor.JSCronExpressionVisitor;
import jsuis.interpreter.parser.expression.JSExpression;

/**
 * Cron range
 * 
 * @author Yassuo Toda
 */
public class JSCronRangeExpression extends JSCronExpression {

	public JSExpression min;
	public JSExpression max;
	public JSCronFieldType fieldType;
	
	public JSCronRangeExpression(JSExpression min, JSExpression max, JSCronFieldType fieldType) {
		this.min = min;
		this.max = max;
		this.fieldType = fieldType;
	}

	@Override
	public <R> R accept(JSCronExpressionVisitor<R> visitor, long start, long end, int size, int months) {
		return visitor.visitRangeExpression(this, start, end, size, months);
	}
}
