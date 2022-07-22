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
	
	@JSParameter(name = "name", value = "put")
	@JSParameter(name = "map", value = "map")
	@JSParameter(name = "key", value = "key")
	private Map<String, Object> parameterMap;
	
	@SuppressWarnings("unchecked")
	@Override
	public void execute() throws Exception {
		
		Object object = getObject("map");
		if (!(object instanceof Map)) {
			throw new Exception(String.format("Object '%s' is not a Map", object));
		}
		Map<String, Object> map = (Map<String, Object>) object;
		String key = getString("key");
		Object value = getValue();
		
		map.put(key, value);
	}

	@Override
	public <T> T accept(JSTaskVisitor<T> visitor) {
		return visitor.visitPutTask(this);
	}
}
