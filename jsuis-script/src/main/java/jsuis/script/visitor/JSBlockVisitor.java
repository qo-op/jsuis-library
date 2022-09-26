package jsuis.script.visitor;

import jsuis.script.block.JSBlock;

/**
 * Block visitor
 * 
 * @author Yassuo Toda
 */
public interface JSBlockVisitor<T> {

	public T visitBlock(JSBlock block);
}
