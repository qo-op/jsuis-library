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
	
	@JSParameter(name = "type", value = "String")
	
	@JSParameter(type = Void.class, parent = "type", name = "stringType", value = "String")
	@JSParameter(type = Void.class, parent = "type", name = "booleanType", value = "Boolean")
	@JSParameter(type = Void.class, parent = "type", name = "dateType", value = "Date")
	@JSParameter(type = Void.class, parent = "type", name = "decimalType", value = "Decimal")
	@JSParameter(type = Void.class, parent = "type", name = "doubleType", value = "Double")
	@JSParameter(type = Void.class, parent = "type", name = "fileType", value = "File")
	@JSParameter(type = Void.class, parent = "type", name = "imageType", value = "Image")
	@JSParameter(type = Void.class, parent = "type", name = "integerType", value = "Integer")
	@JSParameter(type = Void.class, parent = "type", name = "objectType", value = "Object")

	@JSParameter(type = Void.class, parent = "type", name = "stringListType", value = "StringList")
	@JSParameter(type = Void.class, parent = "type", name = "booleanListType", value = "BooleanList")
	@JSParameter(type = Void.class, parent = "type", name = "dateListType", value = "DateList")
	@JSParameter(type = Void.class, parent = "type", name = "decimalListType", value = "DecimalList")
	@JSParameter(type = Void.class, parent = "type", name = "doubleListType", value = "DoubleList")
	@JSParameter(type = Void.class, parent = "type", name = "fileListType", value = "FileList")
	@JSParameter(type = Void.class, parent = "type", name = "imageListType", value = "ImageList")
	@JSParameter(type = Void.class, parent = "type", name = "integerListType", value = "IntegerList")
	@JSParameter(type = Void.class, parent = "type", name = "objectListType", value = "ObjectList")
	
	@JSParameter(type = Void.class, parent = "type", name = "stringMapType", value = "StringMap")
	@JSParameter(type = Void.class, parent = "type", name = "booleanMapType", value = "BooleanMap")
	@JSParameter(type = Void.class, parent = "type", name = "dateMapType", value = "DateMap")
	@JSParameter(type = Void.class, parent = "type", name = "decimalMapType", value = "DecimalMap")
	@JSParameter(type = Void.class, parent = "type", name = "doubleMapType", value = "DoubleMap")
	@JSParameter(type = Void.class, parent = "type", name = "fileMapType", value = "FileMap")
	@JSParameter(type = Void.class, parent = "type", name = "imageMapType", value = "ImageMap")
	@JSParameter(type = Void.class, parent = "type", name = "integerMapType", value = "IntegerMap")
	@JSParameter(type = Void.class, parent = "type", name = "objectMapType", value = "ObjectMap")
	
	@JSParameter(type = Void.class, parent = "type", name = "tableType", value = "Table")
	
	@JSParameter(name = "value", parent = "stringType, booleanType, dateType, decimalType, doubleType, fileType, imageType, integerType, objectType")
	
	@JSParameter(type = List.class, name = "listValue", parent = "stringListType, booleanListType, dateListType, decimalListType, doubleListType, fileListType, imageListType, integerListType, objectListType")
	@JSParameter(type = List.class, parent = "listValue", name = "elementValue")
	
	@JSParameter(type = Map.class, name = "mapValue", parent = "stringMapType, booleanMapType, dateMapType, decimalMapType, doubleMapType, fileMapType, imageMapType, integerMapType, objectMapType")
	@JSParameter(type = List.class, parent = "mapValue", name = "entryKey", value = "key")
	@JSParameter(type = List.class, parent = "mapValue", name = "entryValue", value = "value")
	
	@JSParameter(type = List.class, name = "tableValue", parent = "tableType")
	@JSParameter(type = List.class, parent = "tableValue", name = "a", value = "a")
	@JSParameter(type = List.class, parent = "tableValue", name = "b", value = "b")
	@JSParameter(type = List.class, parent = "tableValue", name = "c", value = "c")
	@JSParameter(type = List.class, parent = "tableValue", name = "d", value = "d")
	@JSParameter(type = List.class, parent = "tableValue", name = "e", value = "e")
	private Map<String, Object> parameterMap;
	
	public Object getValue() throws IOException, ScriptException {
		Object value;
		String type = getString("type");
		if (type.endsWith("List")) {
			Class<?> elementType = getType(type.substring(0, type.length() - 4));
			value = getList("listValue", elementType);
		} else if (type.endsWith("Map")) {
			Class<?> entryType = getType(type.substring(0, type.length() - 3));
			value = getMap("mapValue", entryType, "key", "value");
		} else if (type.equals("Table")) {
			value = getTable("tableValue");
		} else {
			value = get("value", getType(type));
		}
		return value;
	}
}
