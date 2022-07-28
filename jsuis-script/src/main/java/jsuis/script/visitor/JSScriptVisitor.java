package jsuis.script.visitor;

/**
 * Script visitor
 * 
 * @author Yassuo Toda
 *
 * @param <R>
 */
public interface JSScriptVisitor<R> extends JSBlockVisitor<R>, JSTaskVisitor<R> {
}
