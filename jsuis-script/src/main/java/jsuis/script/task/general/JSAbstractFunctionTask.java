package jsuis.script.task.general;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import jsuis.script.annotation.JSParameter;
import jsuis.script.argument.JSArgument;
import jsuis.script.block.JSFunctionBlock;
import jsuis.script.task.JSTask;

/**
 * Function abstract task
 * 
 * @author Yassuo Toda
 */
public abstract class JSAbstractFunctionTask extends JSTask {
	
	@JSParameter(required = true, type = List.class, name = "arguments", component = "Table")
	@JSParameter(type = List.class, parent = "arguments", name = "argumentType", label = "Type", component = "Combo")
	@JSParameter(type = String.class, parent = "argumentType", label = "String")
	@JSParameter(type = String.class, parent = "argumentType", label = "Boolean")
	@JSParameter(type = String.class, parent = "argumentType", label = "Date")
	@JSParameter(type = String.class, parent = "argumentType", label = "Decimal")
	@JSParameter(type = String.class, parent = "argumentType", label = "Double")
	@JSParameter(type = String.class, parent = "argumentType", label = "File")
	@JSParameter(type = String.class, parent = "argumentType", label = "Image")
	@JSParameter(type = String.class, parent = "argumentType", label = "Integer")
	@JSParameter(type = String.class, parent = "argumentType", label = "Object")
	@JSParameter(type = List.class, parent = "arguments", name = "argumentParent", label = "Parent")
	@JSParameter(required = true, type = List.class, parent = "arguments", name = "argumentName", label = "Name")
	@JSParameter(type = List.class, parent = "arguments", name = "argumentRequired", label = "Required")
	@JSParameter(type = List.class, parent = "arguments", name = "argumentValue", label = "Value")
	@JSParameter(type = List.class, parent = "arguments", name = "argumentLabel", label = "Label")
	@JSParameter(type = List.class, parent = "arguments", name = "argumentDescription", label = "Description")
	@JSParameter(type = List.class, parent = "arguments", name = "argumentComponent", label = "Component", component = "Combo")
	@JSParameter(type = String.class, parent = "argumentComponent", label = "Button")
	@JSParameter(type = String.class, parent = "argumentComponent", label = "Check")
	@JSParameter(type = String.class, parent = "argumentComponent", label = "Combo")
	@JSParameter(type = String.class, parent = "argumentComponent", label = "Field")
	@JSParameter(type = String.class, parent = "argumentComponent", label = "Image")
	@JSParameter(type = String.class, parent = "argumentComponent", label = "Label")
	@JSParameter(type = String.class, parent = "argumentComponent", label = "Menu")
	@JSParameter(type = String.class, parent = "argumentComponent", label = "Panel")
	@JSParameter(type = String.class, parent = "argumentComponent", label = "Password")
	@JSParameter(type = String.class, parent = "argumentComponent", label = "Progress")
	@JSParameter(type = String.class, parent = "argumentComponent", label = "Radio")
	@JSParameter(type = String.class, parent = "argumentComponent", label = "Slider")
	@JSParameter(type = String.class, parent = "argumentComponent", label = "Split")
	@JSParameter(type = String.class, parent = "argumentComponent", label = "Tab")
	@JSParameter(type = String.class, parent = "argumentComponent", label = "Table")
	@JSParameter(type = String.class, parent = "argumentComponent", label = "Text")
	@JSParameter(type = String.class, parent = "argumentComponent", label = "Tree")
	private Map<String, Object> parameterMap;
	
	@Override
	public void execute() throws Exception {
		
		Map<String, JSArgument> argumentMap = new LinkedHashMap<>();
		List<Map<String, Object>> table = getTable("arguments");
		if (table != null) {
			int size = table.size();
			for (int i = 0; i < size; i++) {
				Map<String, Object> cellMap = table.get(i);
				Class<?> type = getType((String) nvl(cellMap.get("argumentType"), "String"));
				String parent = nvl((String) cellMap.get("argumentParent"), "");
				String name = (String) cellMap.get("argumentName");
				boolean required = nvl((Boolean) cellMap.get("argumentRequired"), false);
				String value = nvl((String) cellMap.get("argumentValue"), "");
				String label = nvl((String) cellMap.get("argumentLabel"), "");
				String description = nvl((String) cellMap.get("argumentDescription"), "");
				Class<?> component = getComponent((String) nvl(cellMap.get("argumentComponent"), "Field"));
				JSArgument argument = new JSArgument(type, parent, name, required, value, label, description, component);
				argumentMap.put(argument.getName(), argument);
			}
		}
		setArgumentMap(argumentMap);
		
		getFunctionBlock().setBlock(getBlock());
	}
	
	private Map<String, JSArgument> argumentMap;

	public Map<String, JSArgument> getArgumentMap() {
		return argumentMap;
	}
	
	public void setArgumentMap(Map<String, JSArgument> argumentMap) {
		this.argumentMap = argumentMap;
	}
	
	private JSFunctionBlock functionBlock;

	public JSFunctionBlock getFunctionBlock() {
		if (functionBlock == null) {
			functionBlock = new JSFunctionBlock();
		}
		return functionBlock;
	}

	public JSAbstractFunctionTask setFunctionBlock(JSFunctionBlock functionBlock) {
		this.functionBlock = functionBlock;
		return this;
	}
}
