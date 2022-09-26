package jsuis.script.executor;

import java.io.BufferedReader;
import java.io.File;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.lang.ProcessBuilder.Redirect;
import java.util.List;
import java.util.Map;
import java.util.Set;

import jsuis.script.annotation.JSRequired;

/**
 * Process executor
 * 
 * @author Yassuo Toda
 */
public class JSProcess extends JSExecutor<String> {
	
	@JSRequired private List<String> command;
	private File directory;
	private String charset;
	private Map<String, String> environment;
	private String result;

	public JSProcess command(List<String> command) {
		this.command = command;
		return this;
	}

	public JSProcess directory(File directory) {
		this.directory = directory;
		return this;
	}

	public JSProcess charset(String charset) {
		this.charset = charset;
		return this;
	}

	public JSProcess environment(Map<String, String> environment) {
		this.environment = environment;
		return this;
	}

	public String result() {
		return result;
	}

	public void run() throws Exception {
		
		ProcessBuilder processBuilder = new ProcessBuilder(command);
		processBuilder.redirectError(Redirect.INHERIT);
		if (directory != null && directory.exists()) {
			processBuilder.directory(directory);
		}
		Map<String, String> processBuilderEnvironment = processBuilder.environment();
		processBuilderEnvironment.put("JAVA_HOME", System.getProperty("java.home"));
		processBuilderEnvironment.put("CLASSPATH", System.getProperty("java.class.path"));
		if (environment != null) {
			Set<String> keySet = environment.keySet(); 
			for (String name : keySet) {
				processBuilderEnvironment.put(name, (String) environment.get(name));
			}
		}
		Process process = processBuilder.start();
		StringWriter stringWriter = new StringWriter();
		PrintWriter printWriter = new PrintWriter(stringWriter);
		BufferedReader out = null;
		try {
			if (charset != null && !charset.trim().isEmpty()) {
				out = new BufferedReader(new InputStreamReader(process.getInputStream(), charset));
			} else {
				out = new BufferedReader(new InputStreamReader(process.getInputStream()));
			}
			String line;
			while ((line = out.readLine()) != null) {
				printWriter.println(line);
			}
		} finally {
			if (out != null) {
				out.close();
			}
		}
		process.waitFor();
		result = stringWriter.toString();
	}
}
