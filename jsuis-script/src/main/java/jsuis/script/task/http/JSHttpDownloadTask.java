package jsuis.script.task.http;

import java.io.File;
import java.net.URL;
import java.util.Map;

import jsuis.file.JSFileUtils;
import jsuis.script.annotation.JSParameter;
import jsuis.script.task.JSTask;
import jsuis.script.visitor.JSTaskVisitor;

/**
 * Http Download task
 * 
 * variable = Http.download(url, file);
 * 
 * Http.download(url, file);
 * 
 * @author Yassuo Toda
 */
public class JSHttpDownloadTask extends JSTask {
	
	@JSParameter(name = "name", value = "Http.download")
	@JSParameter(name = "variable")
	@JSParameter(name = "url")
	@JSParameter(name = "file")
	private Map<String, Object> parameterMap;
	
	@Override
	public void execute() throws Exception {
		
		String variable = getString("variable");
		URL url = new URL(getString("url"));
		File file = getFile("file");
		
		// TODO Apache HttpComponents
		JSFileUtils.copyURLToFile(url, file);
		
		if (variable != null && !variable.isEmpty()) {
			getBlock().set(variable, file);
		}
	}

	@Override
	public <T> T accept(JSTaskVisitor<T> visitor) {
		return visitor.visitHttpDownloadTask(this);
	}
}
