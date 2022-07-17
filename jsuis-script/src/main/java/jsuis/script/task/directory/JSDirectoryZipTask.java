package jsuis.script.task.directory;

import java.io.File;
import java.nio.file.Paths;
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
 * Directory.zip(source, fileList, destination)
 * Directory.zip(source, fileList, destination, overwrite)
 * Directory.zip(source, fileList, destination, overwrite, preserve)
 * 
 * @author Yassuo Toda
 */
public class JSDirectoryZipTask extends JSTask {
	
	@JSParameter(name = "name", value = "Directory.zip")
	@JSParameter(type = File.class, name = "source")
	@JSParameter(type = File.class, parent = "source")
	@JSParameter(name = "include", value = "*")
	@JSParameter(name = "exclude")
	@JSParameter(name = "fileList")
	@JSParameter(type = File.class, name = "destination")
	@JSParameter(type = Boolean.class, name = "overwrite", value = "false")
	@JSParameter(type = Boolean.class, name = "preserve", value = "true")
	private Map<String, Object> parameterMap;

	@SuppressWarnings("unchecked")
	@Override
	public void execute() throws Exception {
		
		File source = getFile("source");
		String include = getString("include");
		String exclude = getString("exclude");
		List<File> fileList = (List<File>) get("fileList", List.class);
		File destination = getFile("destination");
		if (destination == null) {
			String fileName = source.toPath().normalize().getFileName().toString();
			if (!fileName.isEmpty()) {
				destination = source.toPath().getParent().resolve(Paths.get("..", fileName + ".zip")).toFile();
			}
		}
		boolean overwrite = getBoolean("overwrite");
		boolean preserve = getBoolean("preserve");
		
		if (fileList != null && !fileList.isEmpty()) {
			JSDirectoryUtils.zip(source, fileList, destination, overwrite, preserve);
		} else {
			JSDirectoryUtils.zip(source, include, exclude, destination, overwrite, preserve);
		}
	}

	@Override
	public <T> T accept(JSTaskVisitor<T> visitor) {
		return visitor.visitDirectoryZipTask(this);
	}
}
