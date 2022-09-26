package jsuis.script.argument;

import javax.swing.JTextField;

import jsuis.converter.JSConvertUtils;

/**
 * Argument
 * 
 * @author Yassuo Toda
 */
public class JSArgument {

	public JSArgument() {
		this(String.class, "", "", false, "", "", "", JTextField.class);
	}
	
	private Class<?> type;
	private String parent;
	private String name;
	private boolean required;
	private Object value;
	private String label;
	private String description;
	private Class<?> component;
	
	public JSArgument(Class<?> type, String parent, String name, boolean required, String value, String label, String description, Class<?> component) {
		this.type = type;
		this.parent = parent;
		this.name = name;
		this.required = required;
		this.value = JSConvertUtils.convert(value, type);
		this.label = label;
		this.description = description;
		this.component = component;
	}

	public Class<?> getType() {
		return type;
	}

	public String getParent() {
		return parent;
	}

	public String getName() {
		return name;
	}

	public boolean isRequired() {
		return required;
	}
	
	public Object getValue() {
		return value;
	}

	public String getLabel() {
		return label;
	}

	public String getDescription() {
		return description;
	}
	
	public Class<?> getComponent() {
		return component;
	}
}
