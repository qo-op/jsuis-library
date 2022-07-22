package jsuis.script.task.general;

import java.io.BufferedReader;
import java.io.File;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.lang.ProcessBuilder.Redirect;
import java.util.List;
import java.util.Map;
import java.util.Set;

import jsuis.script.annotation.JSParameter;
import jsuis.script.task.JSTask;
import jsuis.script.visitor.JSTaskVisitor;

/**
 * Process task
 * 
 * variable = process(command);
 * variable = process(command, directory);
 * variable = process(command, directory, charset);
 * variable = process(command, directory, charset, { variable : value, variable : value, ... });
 * 
 * process(command);
 * process(command, directory);
 * process(command, directory, charset);
 * process(command, directory, charset, { variable : value, variable : value, ... });
 * 
 * @author Yassuo Toda
 */
public class JSProcessTask extends JSTask {
	
	@JSParameter(name = "name", value = "process")
	@JSParameter(name = "variable")
	@JSParameter(type = List.class, name = "command")
	@JSParameter(type = List.class, parent = "command", name = "string")
	@JSParameter(type = File.class, name = "directory", value = ".\\")
	@JSParameter(type = File.class, parent = "directory")
	@JSParameter(name = "charset")
	@JSParameter(type = Map.class, name = "variables")
	@JSParameter(type = List.class, parent = "variables", name = "variableName", value = "variable")
	@JSParameter(type = List.class, parent = "variables", name = "variableValue", value = "value")
	private Map<String, Object> parameterMap;
	
	@Override
	public void execute() throws Exception {
		
		String variable = getString("variable");
		List<Object> command = getList("command", String.class);
		File directory = getFile("directory");
		String charset = getString("charset");
		Map<String, Object> variables = getMap("variables", String.class, "variable", "value");
		
		ProcessBuilder processBuilder = new ProcessBuilder(command.toArray(new String[0]));
		if (variable == null || variable.isEmpty()) {
			processBuilder.redirectError(Redirect.INHERIT);
			processBuilder.redirectOutput(Redirect.INHERIT);
		}
		Map<String, String> environment = processBuilder.environment();
		environment.put("JAVA_HOME", System.getProperty("java.home"));
		environment.put("CLASSPATH", System.getProperty("java.class.path"));
		Set<String> keySet = variables.keySet();
		for (String key : keySet) {
			environment.put(key, (String) variables.get(key));
		}
		if (directory != null && directory.exists()) {
			processBuilder.directory(directory);
		}
		Process process = processBuilder.start();
		StringWriter result = new StringWriter();
		if (variable != null && !variable.isEmpty()) {
			PrintWriter printWriter = new PrintWriter(result);
			BufferedReader out = null;
			try {
				if (charset != null && !charset.isEmpty()) {
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
			if (variable != null && !variable.isEmpty()) {
				getBlock().set(variable, result.toString().replaceAll("\\Q" + System.lineSeparator() + "\\E$", ""));
			}
		} else {
			process.waitFor();
		}
	}

	@Override
	public <T> T accept(JSTaskVisitor<T> visitor) {
		return visitor.visitProcessTask(this);
	}
}
