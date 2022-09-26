package jsuis.script.variable.parser;

import javax.script.ScriptException;

import jsuis.interpreter.parser.statement.JSStatement;
import jsuis.script.variable.visitor.JSVariableStatementVisitor;

/**
 * Variable statement
 * 
 * @author Yassuo Toda
 */
public abstract class JSVariableStatement implements JSStatement {

	public abstract <R> R accept(JSVariableStatementVisitor<R> visitor) throws ScriptException;
}
