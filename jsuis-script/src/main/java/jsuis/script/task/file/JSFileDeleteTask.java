package jsuis.script.task.file;

import java.io.File;
import java.nio.file.Files;
import java.util.Map;

import jsuis.script.annotation.JSParameter;
import jsuis.script.task.JSTask;
import jsuis.script.visitor.JSTaskVisitor;

/**
 * File delete task
 * 
 * File.delete(file)
 * 
 * @author Yassuo Toda
 */
public class JSFileDeleteTask extends JSTask {
	
	@JSParameter(type = File.class, name = "file")
	private Map<String, Object> parameterMap;

	@Override
	public void execute() throws Exception {
		
		File file = getFile("file");
		
		Files.delete(file.toPath());
	}

	@Override
	public <T> T accept(JSTaskVisitor<T> visitor) {
		return visitor.visitFileDeleteTask(this);
	}
}
