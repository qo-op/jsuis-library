package jsuis.util;

/**
 * Null value
 * 
 * @author Yassuo Toda
 */
public class NVL {
	
	public static <T> T nvl(T value, T defaultValue) {
		return value != null ? value : defaultValue;
	}
}
