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
	
	@JSParameter(type = List.class, name = "arguments")
	@JSParameter(type = List.class, parent = "arguments", name = "argumentType", value = "type")
	@JSParameter(type = Void.class, parent = "argumentType", name = "argumentStringType", value = "String")
	@JSParameter(type = Void.class, parent = "argumentType", name = "argumentBooleanType", value = "Boolean")
	@JSParameter(type = Void.class, parent = "argumentType", name = "argumentDateType", value = "Date")
	@JSParameter(type = Void.class, parent = "argumentType", name = "argumentDecimalType", value = "Decimal")
	@JSParameter(type = Void.class, parent = "argumentType", name = "argumentDoubleType", value = "Double")
	@JSParameter(type = Void.class, parent = "argumentType", name = "argumentFileType", value = "File")
	@JSParameter(type = Void.class, parent = "argumentType", name = "argumentImageType", value = "Image")
	@JSParameter(type = Void.class, parent = "argumentType", name = "argumentIntegerType", value = "Integer")
	@JSParameter(type = Void.class, parent = "argumentType", name = "argumentObjectType", value = "Object")
	@JSParameter(type = List.class, parent = "arguments", name = "argumentName", value = "name")
	@JSParameter(type = List.class, parent = "arguments", name = "argumentValue", value = "value")
	@JSParameter(type = List.class, parent = "arguments", name = "argumentParent", value = "parent")
	@JSParameter(type = List.class, parent = "arguments", name = "argumentLabel", value = "label")
	@JSParameter(type = List.class, parent = "arguments", name = "argumentDescription", value = "description")
	private Map<String, Object> parameterMap;
	
	@Override
	public void execute() throws Exception {
		
		Map<String, JSArgument> argumentMap = new LinkedHashMap<>();
		List<Map<String, Object>> table = getTable("arguments");
		if (table != null) {
			int size = table.size();
			for (int i = 0; i < size; i++) {
				Map<String, Object> cellMap = table.get(i);
				Class<?> type = getType((String) cellMap.get("type"));
				String name = (String) cellMap.get("name");
				String value = nvl((String) cellMap.get("value"), "");
				String parent = nvl((String) cellMap.get("parent"), "");
				String label = nvl((String) cellMap.get("label"), "");
				String description = nvl((String) cellMap.get("description"), "");
				JSArgument argument = new JSArgument(type, name, value, parent, label, description);
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
