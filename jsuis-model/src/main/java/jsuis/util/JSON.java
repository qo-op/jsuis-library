package jsuis.util;

import java.io.IOException;

import org.codehaus.jackson.map.ObjectMapper;

/**
 * JSON
 * 
 * @author Yassuo Toda
 */
public class JSON {
	
	public static String stringify(Object value) throws IOException {
		return getObjectMapper().writeValueAsString(value);
	}
	
	public static <T> T parse(String text, Class<T> type) throws IOException {
		if (text == null || text.isEmpty()) {
			return null;
		}
		return getObjectMapper().readValue(text, type);
	}

	private static ObjectMapper objectMapper;
	
	private static ObjectMapper getObjectMapper() {
		if (objectMapper == null) {
			objectMapper = new ObjectMapper();
		}
		return objectMapper;
	}
}
