package jsuis.script.variable.visitor;

/**
 * Variable visitor
 * 
 * @author Yassuo Toda
 *
 * @param <R>
 */
public interface JSVariableVisitor<R> extends JSVariableStatementVisitor<R>, JSVariableExpressionVisitor<R> {
}
