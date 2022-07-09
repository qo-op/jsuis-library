package jsuis.converter;

import java.io.File;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.beanutils.ConvertUtils;

import jsuis.io.JSFileUtils;

/**
 * Convert utils
 * 
 * @author Yassuo Toda
 */
public class JSConvertUtils {

	public static Object convert(Object object, Class<?> targetType, String... formats) {
		if (object == null) {
			return null;
		}
		if (targetType.isAssignableFrom(Object.class) && object instanceof String) {
			String string = (String) object;
			if (targetType != String.class && string.isEmpty()) {
				return null;
			}
			if (targetType == Date.class) {
				return toDate(string, formats);
			}
			if (targetType == File.class) {
				File file = (File) ConvertUtils.convert(string, File.class);
				return JSFileUtils.translate(file);
			}
		}
		if (targetType == List.class && object.getClass().isArray()) {
			Object[] objects = (Object[]) ConvertUtils.convert(object, Object[].class);
			return toList(objects, object.getClass().getComponentType());
		}
		return ConvertUtils.convert(object, targetType);
	}
	
	private static Date toDate(String string, String... dateFormats) {
		if (dateFormats.length == 0) {
			try {
				return getDefaultDateFormat().parse(string);
			} catch (ParseException e) {
			}
		} else {
			for (String dateFormat : dateFormats) {
				try {
					return getDateFormat(dateFormat).parse(string);
				} catch (ParseException e) {
				}
			}
		}
        System.err.println("Unparseable date: \"" + string + "\"");
		return null;
	}
	
	private static DateFormat defaultDateFormat;
	
	private static DateFormat getDefaultDateFormat() {
		if (defaultDateFormat == null) {
			defaultDateFormat = getDateFormat("yyyy-MM-dd");
		}
		return defaultDateFormat;
	}
	
	private static DateFormat getDateFormat(String format) {
		Map<String, DateFormat> dateFormatMap = getDateFormatMap();
		DateFormat dateFormat = dateFormatMap.get(format);
		if (dateFormat == null) {
			dateFormat = new SimpleDateFormat(format);
			dateFormatMap.put(format, dateFormat);
		}
		return dateFormat;
	}
	
	private static Map<String, DateFormat> dateFormatMap;
	
	public static Map<String, DateFormat> getDateFormatMap() {
		if (dateFormatMap == null) {
			dateFormatMap = new HashMap<>();
		}
		return dateFormatMap;
	}
	
	@SuppressWarnings("unchecked")
	public static <T> List<T> toList(Object[] objects, Class<T> type) {
		List<T> list = new ArrayList<>();
		for (Object object : objects) {
			list.add((T) object);
		}
		return list;
	}
}
