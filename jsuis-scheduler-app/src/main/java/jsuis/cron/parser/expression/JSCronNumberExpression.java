package jsuis.cron.parser.expression;

import jsuis.cron.parser.JSCronFieldType;
import jsuis.cron.visitor.JSCronExpressionVisitor;

/**
 * Cron number
 * 
 * @author Yassuo Toda
 */
public class JSCronNumberExpression extends JSCronExpression {

	public int number;
	public JSCronFieldType fieldType;
	
	public JSCronNumberExpression(int number, JSCronFieldType fieldType) {
		this.number = number;
		this.fieldType = fieldType;
	}

	@Override
	public <R> R accept(JSCronExpressionVisitor<R> visitor, long start, long end, int size, int months) {
		return visitor.visitNumberExpression(this, start, end, size, months);
	}
}
