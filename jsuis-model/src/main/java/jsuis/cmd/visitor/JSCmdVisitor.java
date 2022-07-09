package jsuis.cmd.visitor;

/**
 * Cmd visitor
 * 
 * @author Yassuo Toda
 *
 * @param <R>
 */
public interface JSCmdVisitor<R> extends JSCmdStatementVisitor<R>, JSCmdExpressionVisitor<R> {
}
