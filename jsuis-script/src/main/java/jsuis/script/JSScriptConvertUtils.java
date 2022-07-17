package jsuis.script;

import java.util.LinkedHashMap;
import java.util.Map;

import jsuis.converter.JSConvertUtils;

/**
 * Script convert utils
 * 
 * @author Yassuo Toda
 */
public class JSScriptConvertUtils extends JSConvertUtils {
	
	public static Object convert(Object object, Class<?> targetType) {
		if (object == null) {
			return null;
		}
		if (targetType == Map.class && object.getClass().isArray() && object.getClass().getComponentType() == String.class) {
			return toMap((String[]) object);
		}
		return JSConvertUtils.convert(object, targetType);
	}
	
	public static Map<String, Object> toMap(String[] strings) {
		Map<String, Object> map = new LinkedHashMap<>();
		for (int i = 0; i < strings.length - 1; i += 2) {
			map.put(strings[i], strings[i + 1]);
		}
		return map;
	}
}
