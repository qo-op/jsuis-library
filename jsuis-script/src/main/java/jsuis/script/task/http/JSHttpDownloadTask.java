package jsuis.script.task.http;

import java.io.File;
import java.util.Map;

import jsuis.script.annotation.JSParameter;
import jsuis.script.executor.JSHttpDownload;
import jsuis.script.task.JSTask;
import jsuis.script.visitor.JSTaskVisitor;

/**
 * Http download task
 * 
 * @author Yassuo Toda
 */
public class JSHttpDownloadTask extends JSTask {
	
	@JSParameter(name = "variable")
	@JSParameter(type = File.class, name = "destination", value = "~\\Downloads\\", component = "Directory")
	@JSParameter(name = "fileName")
	@JSParameter(type = Boolean.class, name = "overwrite", value = "false")
	@JSParameter(type = Boolean.class, name = "preserve", value = "true")
	@JSParameter(required = true, name = "url")
	@JSParameter(type = Map.class, name = "parameters")
	@JSParameter(name = "timeout", value = "0")
	@JSParameter(type = Map.class, name = "headers")
	@JSParameter(type = Map.class, name = "cookies")
	private Map<String, Object> parameterMap;
	
	@Override
	public void execute() throws Exception {
		
		String variable = getString("variable");
		File destination = getFile("destination");
		String fileName = getString("fileName");
		Boolean overwrite = getBoolean("overwrite");
		Boolean preserve = getBoolean("preserve");
		String url = getString("url");
		Map<String, String> parameters = getMap("parameters", String.class);
		Integer timeout = getInteger("timeout");
		Map<String, String> headers = getMap("headers", String.class);
		Map<String, String> cookies = getMap("cookies", String.class);
		
		File result = new JSHttpDownload()
				.destination(destination)
				.fileName(fileName)
				.overwrite(overwrite)
				.preserve(preserve)
				.url(url)
				.parameters(parameters)
				.timeout(timeout)
				.headers(headers)
				.cookies(cookies)
				.execute();
		
		if (variable != null && !variable.isEmpty()) {
			getBlock().set(variable, result);
		}
	}

	@Override
	public <T> T accept(JSTaskVisitor<T> visitor) {
		return visitor.visitHttpDownloadTask(this);
	}
}
