package jsuis.cmd.parser.expression;

import jsuis.cmd.visitor.JSCmdExpressionVisitor;

/**
 * Cmd text expression
 * 
 * @author Yassuo Toda
 */
public class JSCmdTextExpression extends JSCmdExpression {

	public String text;
	
	public JSCmdTextExpression(String text) {
		this.text = text;
	}

	@Override
	public <R> R accept(JSCmdExpressionVisitor<R> visitor) {
		return visitor.visitTextExpression(this);
	}
}
