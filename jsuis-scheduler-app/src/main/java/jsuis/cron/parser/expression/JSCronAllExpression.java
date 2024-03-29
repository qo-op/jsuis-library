package jsuis.cron.parser.expression;

import jsuis.cron.parser.JSCronFieldType;
import jsuis.cron.visitor.JSCronExpressionVisitor;

/**
 * Cron all
 * 
 * @author Yassuo Toda
 */
public class JSCronAllExpression extends JSCronExpression {

	public JSCronFieldType fieldType;
	public int min;
	public int max;
	
	public JSCronAllExpression(JSCronFieldType fieldType) {
		this.fieldType = fieldType;
		min = getMin(fieldType, 0);
		max = getMax(fieldType, 0);
	}

	@Override
	public <R> R accept(JSCronExpressionVisitor<R> visitor, long start, long end, int size, int months) {
		return visitor.visitAllExpression(this, start, end, size, months);
	}
}
