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
	
	public static Object convert(Object object, Class<?> targetType, String... formats) {
		if (object == null) {
			return null;
		}
		if (targetType == Map.class && object.getClass().isArray() && object.getClass().getComponentType() == String.class) {
			return toMap((String[]) object);
		}
		return JSConvertUtils.convert(object, targetType, formats);
	}
	
	public static Map<String, String> toMap(String[] strings) {
		Map<String, String> map = new LinkedHashMap<>();
		for (int i = 0; i < strings.length - 1; i += 2) {
			map.put(strings[i], strings[i + 1]);
		}
		return map;
	}
}
