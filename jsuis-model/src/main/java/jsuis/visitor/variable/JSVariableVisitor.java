package jsuis.visitor.variable;

/**
 * Variable visitor
 * 
 * @author Yassuo Toda
 *
 * @param <R>
 */
public interface JSVariableVisitor<R> extends JSVariableStatementVisitor<R>, JSVariableExpressionVisitor<R> {
}
