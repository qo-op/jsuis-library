package jsuis.script;

import java.awt.Image;
import java.io.File;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.ibm.icu.math.BigDecimal;

/**
 * Script type utils
 * 
 * @author Yassuo Toda
 */
public class JSScriptTypeUtils {
	
	public static Class<?> getType(String name) {
		return getTypeMap().get(name);
	}
	
	private static Map<String, Class<?>> typeMap;
	
	private static Map<String, Class<?>> getTypeMap() {
		if (typeMap == null) {
			
			typeMap = new HashMap<>();
			
			typeMap.put("Boolean", Boolean.class);
			typeMap.put("boolean", boolean.class);
			typeMap.put("Date", Date.class);
			typeMap.put("date", Date.class);
			typeMap.put("Decimal", BigDecimal.class);
			typeMap.put("decimal", BigDecimal.class);
			typeMap.put("Double", Double.class);
			typeMap.put("double", double.class);
			typeMap.put("File", File.class);
			typeMap.put("file", File.class);
			typeMap.put("Image", Image.class);
			typeMap.put("image", Image.class);
			typeMap.put("Integer", Integer.class);
			typeMap.put("integer", Integer.class);
			typeMap.put("List", List.class);
			typeMap.put("list", List.class);
			typeMap.put("Map", Map.class);
			typeMap.put("map", Map.class);
			typeMap.put("Object", Object.class);
			typeMap.put("object", Object.class);
			typeMap.put("String", String.class);
			typeMap.put("string", String.class);
			
			typeMap.put("BigDecimal", BigDecimal.class);
			typeMap.put("bigDecimal", BigDecimal.class);
			typeMap.put("bigdecimal", BigDecimal.class);
			
			typeMap.put("Float", Float.class);
			typeMap.put("float", float.class);
			typeMap.put("Long", Long.class);
			typeMap.put("long", long.class);
		}
		return typeMap;
	}
}