package jsuis.converter;

import java.io.File;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.commons.beanutils.ConvertUtils;

import jsuis.file.JSFileUtils;

/**
 * Convert utils
 * 
 * @author Yassuo Toda
 */
public class JSConvertUtils {

	public static Object convert(Object object, Class<?> targetType) {
		if (object == null) {
			return null;
		}
		if (Object.class.isAssignableFrom(targetType) && object instanceof String) {
			String string = (String) object;
			if (targetType != String.class && string.isEmpty()) {
				return null;
			}
			if (targetType == Date.class) {
				return toDate(string);
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
	
	private static Date toDate(String string) {
		string = string.trim();
		int length = string.length();
		switch (length) {
		case 0:
			return Date.from(Instant.now());
		case 10:
			return Date.from(LocalDate.parse(string, DateTimeFormatter.ISO_LOCAL_DATE).atStartOfDay(ZoneId.systemDefault()).toInstant());
		case 19:
			return Date.from(LocalDateTime.parse(string, DateTimeFormatter.ISO_LOCAL_DATE_TIME).atZone(ZoneId.systemDefault()).toInstant());
		default:
			throw new DateTimeParseException("Unparseable date: \"" + string + "\"", string, length);
		}
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
