package jsuis.parser.cron.expression;

import jsuis.parser.cron.JSCronExpression;
import jsuis.parser.cron.JSCronFieldType;
import jsuis.visitor.cron.JSCronExpressionVisitor;

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
