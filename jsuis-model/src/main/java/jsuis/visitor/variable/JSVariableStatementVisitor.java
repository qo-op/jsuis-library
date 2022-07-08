package jsuis.visitor.variable;

import java.util.Map;

import jsuis.parser.JSStatement;
import jsuis.parser.variable.statement.JSVariableLineStatement;
import jsuis.visitor.JSStatementVisitor;

/**
 * Variable statement visitor
 * 
 * @author Yassuo Toda
 */
public interface JSVariableStatementVisitor<R> extends JSStatementVisitor<R> {

	public R visitLineStatement(JSVariableLineStatement statement, Map<String, String> map);
	
	public R visitStatement(JSStatement statement, Map<String, String> map);
}
