package jsuis.script.argument;

import jsuis.script.JSScriptConvertUtils;

/**
 * Argument
 * 
 * @author Yassuo Toda
 */
public class JSArgument {

	public JSArgument() {
		this(String.class, "", "", "", "", "");
	}
	
	private Class<?> type;
	private String name;
	private Object value;
	private String parent;
	private String label;
	private String description;
	
	public JSArgument(Class<?> type, String name, String value, String parent, String label, String description) {
		this.type = type;
		this.name = name;
		this.value = JSScriptConvertUtils.convert(value, type);
		this.parent = parent;
		this.label = label;
		this.description = description;
	}

	public Class<?> getType() {
		return type;
	}

	public String getName() {
		return name;
	}

	public Object getValue() {
		return value;
	}

	public String getParent() {
		return parent;
	}

	public String getLabel() {
		return label;
	}

	public String getDescription() {
		return description;
	}
}
