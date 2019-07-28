package jsuis.jsuislibrary;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Calendar;

import org.apache.commons.io.IOUtils;
import org.springframework.core.io.ClassPathResource;

public class JSUISTutorialUtils {
	
	public static JSUISTutorialUtils instance = null;
	
	public static JSUISTutorialUtils getInstance() {
		if (instance == null) {
			instance = new JSUISTutorialUtils();
		}
		return instance;
	}
	
	public String getResourceAsString(String resource) {
		try {
			return IOUtils.toString(new ClassPathResource(resource).getInputStream(), "ISO-8859-1");
		} catch (IOException e) {
			return null;
		}
	}
}
