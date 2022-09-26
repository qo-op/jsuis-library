package jsuis.script.task.general;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.Map;

import jsuis.script.annotation.JSParameter;
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
	
	@JSParameter(name = "variable")
	@JSParameter(name = "object")
	private Map<String, Object> parameterMap;
	
	@Override
	public void execute() throws Exception {
		
		String variable = getString("variable");
		Object object = getObject("object");
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
			Path path = ((File) object).toPath();
			if (Files.isDirectory(path)) {
				length = Files.list(path).count();
			} else {
				length = Files.size(path);
			}
		} else {
			throw new Exception(String.format("Object '%s' is neither a List, nor a Map, nor a String, nor a File.", object));
		}
		
		getBlock().set(variable, length);
	}

	@Override
	public <T> T accept(JSTaskVisitor<T> visitor) {
		return visitor.visitLengthTask(this);
	}
}
