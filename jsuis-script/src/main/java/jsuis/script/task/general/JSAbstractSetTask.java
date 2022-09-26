package jsuis.script.task.general;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import javax.script.ScriptException;

import jsuis.script.annotation.JSParameter;
import jsuis.script.task.JSTask;

/**
 * Abstract set task
 * 
 * @author Yassuo Toda
 */
public abstract class JSAbstractSetTask extends JSTask {
	
	@JSParameter(name = "type", component = "Combo")
	
	@JSParameter(type = String.class, parent = "type", label = "String")
	@JSParameter(type = String.class, parent = "type", label = "Boolean")
	@JSParameter(type = String.class, parent = "type", label = "Date")
	@JSParameter(type = String.class, parent = "type", label = "Decimal")
	@JSParameter(type = String.class, parent = "type", label = "Double")
	@JSParameter(type = String.class, parent = "type", label = "File")
	@JSParameter(type = String.class, parent = "type", label = "Image")
	@JSParameter(type = String.class, parent = "type", label = "Integer")
	@JSParameter(type = String.class, parent = "type", label = "Object")

	@JSParameter(type = String.class, parent = "type", label = "StringList")
	@JSParameter(type = String.class, parent = "type", label = "BooleanList")
	@JSParameter(type = String.class, parent = "type", label = "DateList")
	@JSParameter(type = String.class, parent = "type", label = "DecimalList")
	@JSParameter(type = String.class, parent = "type", label = "DoubleList")
	@JSParameter(type = String.class, parent = "type", label = "FileList")
	@JSParameter(type = String.class, parent = "type", label = "ImageList")
	@JSParameter(type = String.class, parent = "type", label = "IntegerList")
	@JSParameter(type = String.class, parent = "type", label = "ObjectList")
	
	@JSParameter(type = String.class, parent = "type", label = "StringMap")
	@JSParameter(type = String.class, parent = "type", label = "BooleanMap")
	@JSParameter(type = String.class, parent = "type", label = "DateMap")
	@JSParameter(type = String.class, parent = "type", label = "DecimalMap")
	@JSParameter(type = String.class, parent = "type", label = "DoubleMap")
	@JSParameter(type = String.class, parent = "type", label = "FileMap")
	@JSParameter(type = String.class, parent = "type", label = "ImageMap")
	@JSParameter(type = String.class, parent = "type", label = "IntegerMap")
	@JSParameter(type = String.class, parent = "type", label = "ObjectMap")
	
	@JSParameter(type = String.class, parent = "type", label = "Table")
	
	@JSParameter(name = "value", parent = "stringType, booleanType, dateType, decimalType, doubleType, fileType, imageType, integerType, objectType")
	
	@JSParameter(type = List.class, name = "listValue", parent = "stringListType, booleanListType, dateListType, decimalListType, doubleListType, fileListType, imageListType, integerListType, objectListType")
	
	@JSParameter(type = Map.class, name = "mapValue", parent = "stringMapType, booleanMapType, dateMapType, decimalMapType, doubleMapType, fileMapType, imageMapType, integerMapType, objectMapType")
	
	@JSParameter(type = List.class, name = "tableValue", parent = "tableType")
	@JSParameter(type = List.class, parent = "tableValue", name = "a", label = "a")
	@JSParameter(type = List.class, parent = "tableValue", name = "b", label = "b")
	@JSParameter(type = List.class, parent = "tableValue", name = "c", label = "c")
	@JSParameter(type = List.class, parent = "tableValue", name = "d", label = "d")
	@JSParameter(type = List.class, parent = "tableValue", name = "e", label = "e")
	private Map<String, Object> parameterMap;
	
	public Object getValue() throws IOException, ScriptException {
		Object value;
		String type = nvl(getString("type"), "String");
		if (type.endsWith("List")) {
			Class<?> elementType = getType(type.substring(0, type.length() - 4));
			value = getList("listValue", elementType);
		} else if (type.endsWith("Map")) {
			Class<?> entryType = getType(type.substring(0, type.length() - 3));
			value = getMap("mapValue", entryType);
		} else if (type.equals("Table")) {
			value = getTable("tableValue");
		} else {
			value = get("value", getType(type));
		}
		return value;
	}
}
