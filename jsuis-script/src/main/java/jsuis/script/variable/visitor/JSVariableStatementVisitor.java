package jsuis.script.variable.visitor;

import javax.script.ScriptException;

import jsuis.script.variable.parser.statement.JSVariableLineStatement;

/**
 * Variable statement visitor
 * 
 * @author Yassuo Toda
 */
public interface JSVariableStatementVisitor<R> {

	public R visitLineStatement(JSVariableLineStatement statement) throws ScriptException;
	
	public R visitStatement(JSVariableLineStatement statement) throws ScriptException;
}
