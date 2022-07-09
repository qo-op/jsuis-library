package jsuis.script.bindings;

import javax.script.Bindings;

/**
 * Script context
 * 
 * @author Yassuo Toda
 */
public abstract class JSScriptContext {

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
