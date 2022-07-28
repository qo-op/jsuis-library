package jsuis.script.variable.parser.statement;

import java.util.List;

import javax.script.ScriptException;

import jsuis.interpreter.parser.expression.JSExpression;
import jsuis.script.variable.parser.JSVariableStatement;
import jsuis.script.variable.visitor.JSVariableStatementVisitor;

public class JSVariableLineStatement extends JSVariableStatement {
	
	public String left;
	public List<JSExpression> expressionList;
	
	public JSVariableLineStatement(String left, List<JSExpression> expressionList) {
		this.left = left;
		this.expressionList = expressionList;
	}

	@Override
	public <R> R accept(JSVariableStatementVisitor<R> visitor) throws ScriptException {
		return visitor.visitLineStatement(this);
	}
}
