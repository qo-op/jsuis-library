package jsuis.script.task.file;

import java.io.File;
import java.nio.charset.Charset;
import java.util.Map;

import jsuis.file.JSFileUtils;
import jsuis.script.annotation.JSParameter;
import jsuis.script.task.JSTask;
import jsuis.script.visitor.JSTaskVisitor;

/**
 * File write task
 * 
 * File.write(text, file)
 * File.write(text, file, charset)
 * File.write(text, file, charset, append)
 * 
 * @author Yassuo Toda
 */
public class JSFileWriteTask extends JSTask {
	
	@JSParameter(name = "name", value = "File.write")
	@JSParameter(name = "text")
	@JSParameter(type = File.class, name = "file")
	@JSParameter(name = "charset")
	@JSParameter(type = Boolean.class, name = "append", value = "false")
	
	private Map<String, Object> parameterMap;

	@Override
	public void execute() throws Exception {
		
		String text = getString("text");
		File file = getFile("file");
		String charset = getString("charset");
		boolean append = getBoolean("append");
		
		if (!append) {
			if (charset != null && !charset.isEmpty()) {
				JSFileUtils.writeStringToFile(file, text, Charset.forName(charset), append);
			} else {
				JSFileUtils.writeStringToFile(file, text, Charset.defaultCharset(), append);
			}
		}
	}

	@Override
	public <T> T accept(JSTaskVisitor<T> visitor) {
		return visitor.visitFileWriteTask(this);
	}
}
