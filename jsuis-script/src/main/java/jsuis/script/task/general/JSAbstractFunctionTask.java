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

	public JSAbstractFunctionTask() {
	}
	
	public JSAbstractFunctionTask(Map<String, Object> valueMap) {
		super(valueMap);
	}
	
	@JSParameter(type = List.class, name = "arguments")
	@JSParameter(type = List.class, name = "argumentType", parent = "arguments")
	@JSParameter(type = Void.class, name = "argumentTextType", value = "Text", parent = "argumentType")
	@JSParameter(type = Void.class, name = "argumentBooleanType", value = "Boolean", parent = "argumentType")
	@JSParameter(type = Void.class, name = "argumentDateType", value = "Date", parent = "argumentType")
	@JSParameter(type = Void.class, name = "argumentDecimalType", value = "Decimal", parent = "argumentType")
	@JSParameter(type = Void.class, name = "argumentDoubleType", value = "Double", parent = "argumentType")
	@JSParameter(type = Void.class, name = "argumentFileType", value = "File", parent = "argumentType")
	@JSParameter(type = Void.class, name = "argumentImageType", value = "Image", parent = "argumentType")
	@JSParameter(type = Void.class, name = "argumentIntegerType", value = "Integer", parent = "argumentType")
	@JSParameter(type = Void.class, name = "argumentObjectType", value = "Object", parent = "argumentType")
	@JSParameter(type = List.class, name = "argumentName", parent = "arguments")
	@JSParameter(type = List.class, name = "argumentValue", parent = "arguments")
	@JSParameter(type = List.class, name = "argumentFormat", parent = "arguments")
	@JSParameter(type = List.class, name = "argumentParent", parent = "arguments")
	@JSParameter(type = List.class, name = "argumentLabel", parent = "arguments")
	@JSParameter(type = List.class, name = "argumentDescription", parent = "arguments")
	private Map<String, Object> valueMap;
	
	@Override
	public void execute() throws Exception {
		
		List<Map<String, Object>> argumentTable = getTable("arguments");
		
		Map<String, JSArgument> argumentMap = new LinkedHashMap<>();
		if (argumentTable != null) {
			int size = argumentTable.size();
			for (int i = 0; i < size; i++) {
				Map<String, Object> rowMap = argumentTable.get(i);
				Class<?> argumentType = getType((String) rowMap.get("argumentType"));
				String argumentName = (String) rowMap.get("argumentName");
				String argumentValue = (String) rowMap.get("argumentValue");
				String argumentFormat = nvl((String) rowMap.get("argumentFormat"), "");
				String argumentParent = nvl((String) rowMap.get("argumentParent"), "");
				String argumentLabel = nvl((String) rowMap.get("argumentLabel"), "");
				String argumentDescription = nvl((String) rowMap.get("argumentDescription"), "");
				JSArgument argument = new JSArgument(argumentType, argumentName, argumentValue, argumentFormat, argumentParent, argumentLabel, argumentDescription);
				argumentMap.put(argument.getName(), argument);
			}
		}
		setArgumentMap(argumentMap);
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
