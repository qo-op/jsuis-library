package jsuis.parser.cmd.expression;

import jsuis.parser.cmd.JSCmdExpression;
import jsuis.visitor.cmd.JSCmdExpressionVisitor;

/**
 * Cmd command expression
 * 
 * @author Yassuo Toda
 */
public class JSCmdCommandExpression extends JSCmdExpression {

	public String command;
	
	public JSCmdCommandExpression(String command) {
		this.command = command;
	}

	@Override
	public <R> R accept(JSCmdExpressionVisitor<R> visitor) {
		return visitor.visitCommandExpression(this);
	}
}
