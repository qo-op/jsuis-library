package jsuis.script.bindings;

import javax.script.Bindings;

import jsuis.script.block.JSBlock;

/**
 * Script context
 * 
 * @author Yassuo Toda
 */
public abstract class JSScriptContext {
	
	private JSBlock block;
	
	public JSBlock getBlock() {
		return block;
	}
	
	public void setBlock(JSBlock block) {
		this.block = block;
		Bindings compoundBindings = getCompoundBindings();
		if (compoundBindings instanceof JSCompoundBindings) {
			((JSCompoundBindings) getCompoundBindings()).setSecondary(block);
		} else {
			compoundBindings = new JSCompoundBindings(this, block);
		}
	}
	
	private Bindings compoundBindings;
	
	public Bindings getCompoundBindings() {
		if (compoundBindings == null) {
			compoundBindings = getBindings();
			JSBlock block = getBlock();
			if (block != null) {
				compoundBindings = new JSCompoundBindings(this, block);
			}
		}
		return compoundBindings;
	}

	private Bindings bindings;
	
	public Bindings getBindings() {
		if (bindings == null) {
			bindings = new JSBindings();
		}
		return bindings;
	}
	
	public void setBindings(Bindings bindings) {
		this.bindings = bindings;
	}
}
