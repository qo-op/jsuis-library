package jsuis.script.task.directory;

import java.io.File;
import java.nio.file.Path;
import java.util.List;
import java.util.Map;

import jsuis.file.JSDirectoryUtils;
import jsuis.script.annotation.JSParameter;
import jsuis.script.task.JSTask;
import jsuis.script.visitor.JSTaskVisitor;

/**
 * Directory zip task
 * 
 * Directory.zip(source)
 * Directory.zip(source, overwrite)
 * Directory.zip(source, overwrite, preserve)
 * 
 * Directory.zip(source, destination)
 * Directory.zip(source, destination, overwrite)
 * Directory.zip(source, destination, overwrite, preserve)
 * 
 * Directory.zip(source, include, destination)
 * Directory.zip(source, include, destination, overwrite)
 * Directory.zip(source, include, destination, overwrite, preserve)
 * 
 * Directory.zip(source, include, exclude, destination)
 * Directory.zip(source, include, exclude, destination, overwrite)
 * Directory.zip(source, include, exclude, destination, overwrite, preserve)
 * 
 * Directory.zip(source, nameList, destination)
 * Directory.zip(source, nameList, destination, overwrite)
 * Directory.zip(source, nameList, destination, overwrite, preserve)
 * 
 * @author Yassuo Toda
 */
public class JSDirectoryZipTask extends JSTask {
	
	@JSParameter(type = File.class, name = "source")
	@JSParameter(type = File.class, parent = "source")
	@JSParameter(name = "include")
	@JSParameter(name = "exclude")
	@JSParameter(name = "nameList")
	@JSParameter(type = File.class, name = "destination")
	@JSParameter(type = Boolean.class, name = "overwrite")
	@JSParameter(type = Boolean.class, name = "preserve")
	private Map<String, Object> parameterMap;

	@SuppressWarnings("unchecked")
	@Override
	public void execute() throws Exception {
		
		File source = getFile("source");
		String include = nvl(getString("include"), "*");
		String exclude = getString("exclude");
		List<String> nameList = (List<String>) get("nameList", List.class);
		File destination = getFile("destination");
		if (destination == null) {
			Path path = source.toPath().normalize();
			String fileName = path.getFileName().toString();
			destination = path.getParent().resolve(fileName + ".zip").toFile();
		}
		boolean overwrite = nvl(getBoolean("overwrite"), false);
		boolean preserve = nvl(getBoolean("preserve"), false);
		
		if (nameList != null && !nameList.isEmpty()) {
			JSDirectoryUtils.zip(source, nameList, destination, overwrite, preserve);
		} else {
			JSDirectoryUtils.zip(source, include, exclude, destination, overwrite, preserve);
		}
	}

	@Override
	public <T> T accept(JSTaskVisitor<T> visitor) {
		return visitor.visitDirectoryZipTask(this);
	}
}
