package jsuis.script.task.general;

import java.util.Map;

import jsuis.script.annotation.JSParameter;
import jsuis.script.visitor.JSTaskVisitor;

/**
 * Put task
 * 
 * map.put(key, (type) value)
 * 
 * @author Yassuo Toda
 */
public class JSPutTask extends JSAbstractSetTask {

	public JSPutTask() {
	}
	
	public JSPutTask(Map<String, Object> valueMap) {
		super(valueMap);
	}
	
	@JSParameter(name = "name", value = "put")
	@JSParameter(name = "map", value = "map")
	@JSParameter(name = "key", value = "key")
	private Map<String, Object> valueMap;
	
	@Override
	public void execute() throws Exception {
		
		Map<String, Object> map = getMap("map");
		if (map == null) {
			throw new NullPointerException("" + getBlock().getBindings());
		}
		if (!(map instanceof Map)) {
			throw new Exception(String.format("Object: '%s' is not a Map", map));
		}
		String key = getString("key");
		if (key.isEmpty()) {
			throw new NullPointerException("" + getBlock().getBindings());
		}
		Object value = getValue();
		
		map.put(key, value);
	}

	@Override
	public <T> T accept(JSTaskVisitor<T> visitor) {
		return visitor.visitPutTask(this);
	}
}
