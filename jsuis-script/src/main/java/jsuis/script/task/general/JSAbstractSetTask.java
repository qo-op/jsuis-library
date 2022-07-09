package jsuis.script.task.general;

import java.io.IOException;
import java.util.ArrayList;
import java.util.LinkedHashMap;
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

	public JSAbstractSetTask() {
	}
	
	public JSAbstractSetTask(Map<String, Object> valueMap) {
		super(valueMap);
	}
	
	@JSParameter(name = "type", value = "Text")
	@JSParameter(type = Void.class, name = "textType", value = "Text", parent = "type")
	@JSParameter(type = Void.class, name = "booleanType", value = "Boolean", parent = "type")
	@JSParameter(type = Void.class, name = "dateType", value = "Date", parent = "type")
	@JSParameter(type = Void.class, name = "decimalType", value = "Decimal", parent = "type")
	@JSParameter(type = Void.class, name = "doubleType", value = "Double", parent = "type")
	@JSParameter(type = Void.class, name = "fileType", value = "File", parent = "type")
	@JSParameter(type = Void.class, name = "imageType", value = "Image", parent = "type")
	@JSParameter(type = Void.class, name = "integerType", value = "Integer", parent = "type")
	@JSParameter(type = Void.class, name = "listType", value = "List", parent = "type")
	@JSParameter(type = List.class, name = "listValue", parent = "listType")
	@JSParameter(type = List.class, name = "listItemType", parent = "listValue")
	@JSParameter(type = List.class, name = "listItemValue", parent = "listValue")
	@JSParameter(type = List.class, name = "listItemFormat", parent = "listValue")
	@JSParameter(type = Void.class, name = "mapType", value = "Map", parent = "type")
	@JSParameter(type = Map.class, name = "mapValue", parent = "mapType")
	@JSParameter(type = List.class, name = "mapEntryKey", parent = "mapValue")
	@JSParameter(type = List.class, name = "mapEntryType", parent = "mapValue")
	@JSParameter(type = List.class, name = "mapEntryValue", parent = "mapValue")
	@JSParameter(type = List.class, name = "mapEntryFormat", parent = "mapValue")
	@JSParameter(type = Void.class, name = "objectType", value = "Object", parent = "type")
	@JSParameter(name = "value")
	private Map<String, Object> valueMap;
	
	public Object getValue() throws IOException, ScriptException {
		Object value;
		Class<?> type = getType(getString("type"));
		if (type == List.class) {
			List<Object> list = new ArrayList<>();
			List<Map<String, Object>> table = getTable("listValue");
			if (table != null) {
				int size = table.size();
				for (int i = 0; i < size; i++) {
					Map<String, Object> rowMap = table.get(i);
					Class<?> listItemType = getType(nvl((String) rowMap.get("listItemType"), "Text"));
					String listItemValue = (String) rowMap.get("listItemValue");
					String listItemFormat = nvl((String) rowMap.get("listItemFormat"), "");
					list.add(parse(listItemValue, listItemType, listItemFormat));
				}
			}
			value = list;
		} else if (type == Map.class) {
			Map<String, Object> map = new LinkedHashMap<>();
			List<Map<String, Object>> table = getTable("mapValue");
			if (table != null) {
				int size = table.size();
				for (int i = 0; i < size; i++) {
					Map<String, Object> rowMap = table.get(i);
					String mapEntryKey = (String) rowMap.get("mapEntryKey");
					Class<?> mapEntryType = getType(nvl((String) rowMap.get("mapEntryType"), "Text"));
					String mapEntryValue = (String) rowMap.get("mapEntryValue");
					String mapEntryFormat = nvl((String) rowMap.get("mapEntryFormat"), "");
					map.put(mapEntryKey, parse(mapEntryValue, mapEntryType, mapEntryFormat));
				}
			}
			value = map;
		} else {
			value = get("value", type);
		}
		return value;
	}
}
