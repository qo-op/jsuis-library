package jsuis.util;

import java.io.IOException;

import org.codehaus.jackson.map.ObjectMapper;

/**
 * JSON
 * 
 * @author Yassuo Toda
 */
public class JSON {

	private static final ObjectMapper OBJECT_MAPPER = new ObjectMapper();
	
	public static String stringify(Object value) {
		try {
			return OBJECT_MAPPER.writeValueAsString(value);
		} catch (IOException e) {
			return null;
		}
	}
	
	public static Object parse(String text) {
		return parse(text, Object.class);
	}
	
	public static <T> T parse(String text, Class<T> type) {
		try {
			return OBJECT_MAPPER.readValue(text, type);
		} catch (IOException e) {
			return null;
		}
	}
}
