package jsuis.parser.variable.statement;

import java.util.List;
import java.util.Map;

import jsuis.parser.JSExpression;
import jsuis.parser.variable.JSVariableStatement;
import jsuis.visitor.variable.JSVariableStatementVisitor;

public class JSVariableLineStatement extends JSVariableStatement {
	
	public String left;
	public List<JSExpression> expressionList;
	
	public JSVariableLineStatement(String left, List<JSExpression> expressionList) {
		this.left = left;
		this.expressionList = expressionList;
	}

	@Override
	public <R> R accept(JSVariableStatementVisitor<R> visitor, Map<String, String> map) {
		return visitor.visitLineStatement(this, map);
	}
}
