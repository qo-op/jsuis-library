package jsuis.maven.plugin;

import java.io.File;
import java.util.List;
import java.util.Map;

import org.apache.maven.plugin.AbstractMojo;
import org.apache.maven.plugins.annotations.Parameter;
import org.apache.maven.project.MavenProject;

import jsuis.parser.JSStatement;
import jsuis.parser.variable.JSVariableParser;
import jsuis.scanner.JSToken;
import jsuis.scanner.variable.JSVariableScanner;
import jsuis.visitor.variable.JSVariablePrinter;

/**
 * Mojo
 * 
 * @author Yassuo Toda
 */
public abstract class JSMojo extends AbstractMojo {
	
	@Parameter(defaultValue = "${project}")
	private MavenProject project;
	
	public MavenProject getProject() {
		return project;
	}
	
	@Parameter(property = "map")
	private Map<String, String> map;

	public Map<String, String> getMap() {
		return map;
	}

	public void setProperty(String property, String value) {
		getProject().getProperties().setProperty(property, value);
	}
	
	public String getProperty(String property) {
		return getProject().getProperties().getProperty(property);
	}
	
	public File translate(File file) {
		if (!file.isAbsolute()) {
			String path = file.getAbsolutePath();
		    file = new File(getProject().getBasedir(), path);
		}
		return file;
	}
	
	public String translate(String value) {
		return translate(value, null);
	}
	
	public String translate(String value, String defaultValue) {
		if (value == null) {
			return defaultValue;
		}
		if (!getMap().isEmpty()) {
			JSVariableScanner variableScanner = new JSVariableScanner(value);
			List<JSToken> tokenList = variableScanner.scan();
			JSVariableParser variableParser = new JSVariableParser(tokenList);
			List<JSStatement> statementList = variableParser.parse();
			JSVariablePrinter variablePrinter = getVariablePrinter();
			return variablePrinter.print(statementList, getMap());
		}
		return value;
	}
	
	private JSVariablePrinter variablePrinter;
	
	public JSVariablePrinter getVariablePrinter() {
		if (variablePrinter == null) {
			variablePrinter = new JSVariablePrinter();
		}
		return variablePrinter;
	}
}
