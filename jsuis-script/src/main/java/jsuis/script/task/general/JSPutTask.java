package jsuis.script.task.general;

import java.util.Map;

import jsuis.script.annotation.JSParameter;
import jsuis.script.task.JSTask;
import jsuis.script.visitor.JSTaskVisitor;

/**
 * Put task
 * 
 * map.put(key, value)
 * 
 * @author Yassuo Toda
 */
public class JSPutTask extends JSTask {
	
	@JSParameter(name = "map")
	@JSParameter(name = "key")
	@JSParameter(name = "value")
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
		Object value = getObject("value");
		
		map.put(key, value);
	}

	@Override
	public <T> T accept(JSTaskVisitor<T> visitor) {
		return visitor.visitPutTask(this);
	}
}
