package jsuis.script;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Stack;

import jsuis.script.annotation.JSParameter;
import jsuis.script.annotation.JSParameters;

/**
 * Script parameter anntation utils
 * 
 * @author Yassuo Toda
 */
public class JSScriptParameterAnnotationUtils {
	
	public static JSParameter[] populate(Object object) throws IllegalAccessException, IllegalArgumentException, InvocationTargetException {
		Map<String, JSParameter> parameterAnnotationMap = new LinkedHashMap<>();
		Stack<Class<?>> typeStack = new Stack<>();
		Class<?> type = object.getClass();
		while (type != null) {
			typeStack.add(type);
			type = type.getSuperclass();
		}
		while (!typeStack.isEmpty()) {
			type = typeStack.pop();
			parameterAnnotationMap.putAll(populate(object, type));
		}
		return parameterAnnotationMap.values().toArray(new JSParameter[0]);
	}
	
	private static Map<String, JSParameter> populate(Object object, Class<?> type) throws IllegalAccessException, IllegalArgumentException, InvocationTargetException {
		Map<String, JSParameter> parameterAnnotationMap = new LinkedHashMap<>();
		Field[] fields = type.getDeclaredFields();
		for (Field field : fields) {
			if (field.isAnnotationPresent(JSParameter.class) || field.isAnnotationPresent(JSParameters.class)) {
				Class<?> fieldType = field.getType();
				if (fieldType == Map.class) {
					Map<String, Object> map = new LinkedHashMap<>();
					JSParameter[] parameterAnnotations = field.getAnnotationsByType(JSParameter.class);
					for (JSParameter parameterAnnotation : parameterAnnotations) {
						String parameterAnnotationName = parameterAnnotation.name();
						parameterAnnotationMap.put(parameterAnnotationName, parameterAnnotation);
						if (!isVariable(parameterAnnotation, parameterAnnotationMap)) {
							continue;
						}
						map.put(parameterAnnotationName, JSScriptConvertUtils.convert(parameterAnnotation.value(), parameterAnnotation.type()));
					}
					setParameterValue(object, field, map);
				} else if (fieldType == List.class) {
					List<Object> list = new ArrayList<>();
					JSParameter[] parameterAnnotations = field.getAnnotationsByType(JSParameter.class);
					for (JSParameter parameterAnnotation : parameterAnnotations) {
						String parameterAnnotationName = parameterAnnotation.name();
						parameterAnnotationMap.put(parameterAnnotationName, parameterAnnotation);
						if (!isVariable(parameterAnnotation, parameterAnnotationMap)) {
							continue;
						}
						list.add(JSScriptConvertUtils.convert(parameterAnnotation.value(), parameterAnnotation.type()));
					}
					setParameterValue(object, field, list);
				} else {
					JSParameter[] parameterAnnotations = field.getAnnotationsByType(JSParameter.class);
					for (JSParameter parameterAnnotation : parameterAnnotations) {
						String parameterAnnotationName = parameterAnnotation.name();
						parameterAnnotationMap.put(parameterAnnotationName, parameterAnnotation);
						if (!isVariable(parameterAnnotation, parameterAnnotationMap)) {
							continue;
						}
						setParameterValue(object, field, JSScriptConvertUtils.convert(JSScriptConvertUtils.convert(parameterAnnotation.value(), parameterAnnotation.type()), fieldType));
					}
				}
			}
		}
		return parameterAnnotationMap;
	}

	private static boolean isVariable(JSParameter parameterAnnotation, Map<String, JSParameter> parameterAnnotationMap) {
		return parameterAnnotation.type() != Void.class;
	}
	
	private static void setParameterValue(Object object, Field field, Object value) throws IllegalAccessException, IllegalArgumentException, InvocationTargetException {
		String name = field.getName();
		String setter = "set" + Character.toUpperCase(name.charAt(0)) + name.substring(1);
		Method method = null;
		try {
			method = object.getClass().getMethod(setter, field.getType());
		} catch (NoSuchMethodException | SecurityException e) {
		}
		if (method != null) {
			method.invoke(object, value);
		} else {
			field.setAccessible(true);
			field.set(object, value);
		}
	}
}
