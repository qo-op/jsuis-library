package jsuis.script.task.general;

import java.io.File;
import java.util.List;
import java.util.Map;

import jsuis.script.annotation.JSParameter;
import jsuis.script.block.JSBlock;
import jsuis.script.task.JSTask;
import jsuis.script.visitor.JSTaskVisitor;

/**
 * Length task
 * 
 * variable = object.length;
 * 
 * @author Yassuo Toda
 */
public class JSLengthTask extends JSTask {

	public JSLengthTask() {
	}
	
	public JSLengthTask(Map<String, Object> valueMap) {
		super(valueMap);
	}
	
	@JSParameter(name = "name", value = "length")
	@JSParameter(name = "variable", value = "length")
	@JSParameter(name = "object", value = "x")
	private Map<String, Object> valueMap;
	
	@Override
	public void execute() throws Exception {
		
		String variable = getString("variable");
		Object object = getObject("object");
		if (object == null) {
			throw new NullPointerException("" + getBlock().getBindings());
		}
		long length = 0;
		if (object instanceof List) {
			List<?> list = (List<?>) object;
			length = list.size();
		} else if (object instanceof Map) {
			Map<?, ?> map = (Map<?, ?>) object;
			length = map.size();
		} else if (object instanceof String) {
			String string = (String) object;
			length = string.length();
		} else if (object instanceof File) {
			File file = (File) object;
			if (file.isDirectory()) {
				length = file.listFiles().length;
			} else {
				length = file.length();
			}
		} else {
			throw new Exception(String.format("Object '%s' is neither a List, nor a Map, nor a String, nor a File.", object));
		}
		
		JSBlock block = getBlock();
		block.put(variable, length);
	}

	@Override
	public <T> T accept(JSTaskVisitor<T> visitor) {
		return visitor.visitLengthTask(this);
	}
}
