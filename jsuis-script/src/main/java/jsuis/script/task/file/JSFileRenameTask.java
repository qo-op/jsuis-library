package jsuis.script.task.file;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.Map;

import jsuis.script.annotation.JSParameter;
import jsuis.script.task.JSTask;
import jsuis.script.visitor.JSTaskVisitor;

/**
 * File rename task
 * 
 * variable = File.rename(file, fileName)
 * 
 * File.rename(file, fileName)
 * 
 * @author Yassuo Toda
 */
public class JSFileRenameTask extends JSTask {
	
	@JSParameter(name = "variable")
	@JSParameter(type = File.class, name = "file")
	@JSParameter(name = "fileName") 
	@JSParameter(type = Boolean.class, name = "overwrite")
	private Map<String, Object> parameterMap;

	@Override
	public void execute() throws Exception {
		
		String variable = getString("variable");
		File file = getFile("file");
		String fileName = getString("fileName");
		Boolean overwrite = nvl(getBoolean("overwrite"), false);
		
		Path source = file.toPath();
		Path target = source.resolveSibling(fileName);
		
		if (overwrite) {
			target = Files.move(source, target, StandardCopyOption.REPLACE_EXISTING);
		} else {
			target = Files.move(source, target);
		}
		
		if (variable != null && !variable.isEmpty()) {
			getBlock().set(variable, target.toFile());
		}
	}

	@Override
	public <T> T accept(JSTaskVisitor<T> visitor) {
		return visitor.visitFileRenameTask(this);
	}
}
