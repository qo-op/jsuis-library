package jsuis.parser.variable;

import java.util.Map;

import jsuis.parser.JSStatement;
import jsuis.visitor.variable.JSVariableStatementVisitor;

/**
 * Variable statement
 * 
 * @author Yassuo Toda
 */
public abstract class JSVariableStatement implements JSStatement {

	public abstract <R> R accept(JSVariableStatementVisitor<R> visitor, Map<String, String> map);
}
