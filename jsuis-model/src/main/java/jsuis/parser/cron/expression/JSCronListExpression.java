package jsuis.parser.cron.expression;

import java.util.List;

import jsuis.parser.JSExpression;
import jsuis.parser.cron.JSCronExpression;
import jsuis.visitor.cron.JSCronExpressionVisitor;

/**
 * Cron list
 * 
 * @author Yassuo Toda
 */
public class JSCronListExpression extends JSCronExpression {

	public List<JSExpression> expressionList;
	
	public JSCronListExpression(List<JSExpression> expressionList) {
		this.expressionList = expressionList;
	}

	@Override
	public <R> R accept(JSCronExpressionVisitor<R> visitor, long start, long end, int size, int months) {
		return visitor.visitListExpression(this, start, end, size, months);
	}
}
