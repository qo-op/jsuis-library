package jsuis.lang;

/**
 * Null value
 * 
 * @author Yassuo Toda
 */
public class NVL {

	public static <T> T coalesce(@SuppressWarnings("unchecked") T... values) {
	    for (T value : values) {
	        if (value != null) {
	            return value;
	        }
	    }
	    return null;
	}
}
