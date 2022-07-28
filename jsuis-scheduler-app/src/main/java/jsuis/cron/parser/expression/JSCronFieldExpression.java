package jsuis.cron.parser.expression;

import java.util.List;

import jsuis.cron.visitor.JSCronExpressionVisitor;
import jsuis.interpreter.parser.expression.JSExpression;

/**
 * Cron list
 * 
 * @author Yassuo Toda
 */
public class JSCronFieldExpression extends JSCronExpression {

	public List<JSExpression> expressionList;
	
	public JSCronFieldExpression(List<JSExpression> expressionList) {
		this.expressionList = expressionList;
	}

	@Override
	public <R> R accept(JSCronExpressionVisitor<R> visitor, long start, long end, int size, int months) {
		return visitor.visitFieldExpression(this, start, end, size, months);
	}
}
