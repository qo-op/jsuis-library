package jsuis.visitor.cron;

/**
 * Cron visitor
 * 
 * @author Yassuo Toda
 *
 * @param <R>
 */
public interface JSCronVisitor<R> extends JSCronStatementVisitor<R>, JSCronExpressionVisitor<R> {
}
