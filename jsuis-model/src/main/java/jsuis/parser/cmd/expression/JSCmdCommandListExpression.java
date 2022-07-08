package jsuis.parser.cmd.expression;

import java.util.List;

import jsuis.parser.JSExpression;
import jsuis.parser.cmd.JSCmdExpression;
import jsuis.visitor.cmd.JSCmdExpressionVisitor;

/**
 * Cmd command list expression
 * 
 * @author Yassuo Toda
 */
public class JSCmdCommandListExpression extends JSCmdExpression {

	public List<JSExpression> commandList;
	
	public JSCmdCommandListExpression(List<JSExpression> commandList) {
		this.commandList = commandList;
	}

	@Override
	public <R> R accept(JSCmdExpressionVisitor<R> visitor) {
		return visitor.visitCommandListExpression(this);
	}
}
