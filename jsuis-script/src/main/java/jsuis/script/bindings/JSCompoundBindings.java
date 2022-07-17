package jsuis.script.bindings;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import javax.script.Bindings;

import jsuis.script.block.JSBlock;

/**
 * Compound bindings
 * 
 * @author Yassuo Toda
 */
public class JSCompoundBindings implements Bindings {

	public JSScriptContext primary;
	public JSScriptContext secondary;
	
	public JSCompoundBindings(JSScriptContext primary, JSScriptContext secondary) {
		this.primary = primary;
		this.secondary = secondary;
	}
	
	public void setSecondary(JSBlock secondary) {
		this.secondary = secondary;
	}
	
	@Override
	public int size() {
		return keySet().size();
	}

	@Override
	public boolean isEmpty() {
		return primary.getBindings().isEmpty() && secondary.getCompoundBindings().isEmpty();
	}

	@Override
	public boolean containsValue(Object value) {
		return primary.getBindings().containsValue(value) || secondary.getCompoundBindings().containsValue(value);
	}

	@Override
	public void clear() {
		primary.getBindings().clear();
		secondary.getCompoundBindings().clear();
	}

	@Override
	public Set<String> keySet() {
		Map<String, Object> map = new HashMap<>();
		map.putAll(secondary.getCompoundBindings());
		map.putAll(primary.getBindings());
		return map.keySet();
	}

	@Override
	public Collection<Object> values() {
		Map<String, Object> map = new HashMap<>();
		map.putAll(secondary.getCompoundBindings());
		map.putAll(primary.getBindings());
		return map.values();
	}

	@Override
	public Set<Entry<String, Object>> entrySet() {
		Map<String, Object> map = new HashMap<>();
		map.putAll(secondary.getCompoundBindings());
		map.putAll(primary.getBindings());
		return map.entrySet();
	}

	@Override
	public Object put(String name, Object value) {
		return primary.getBindings().put(name, value);
	}

	@Override
	public void putAll(Map<? extends String, ? extends Object> toMerge) {
		primary.getBindings().putAll(toMerge);
	}

	@Override
	public boolean containsKey(Object key) {
		return primary.getBindings().containsKey(key) || secondary.getCompoundBindings().containsKey(key);
	}

	@Override
	public Object get(Object key) {
		if (primary.getBindings().containsKey(key)) {
			return primary.getBindings().get(key);
		}
		return secondary.getCompoundBindings().get(key);
	}

	@Override
	public Object remove(Object key) {
		Object secondaryRemoved = secondary.getCompoundBindings().remove(key);
		Object primaryRemoved = primary.getBindings().remove(key);
		return primaryRemoved != null ? primaryRemoved : secondaryRemoved;
	}
}
