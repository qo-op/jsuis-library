package jsuis.jsuislibrary;

import java.io.IOException;

import org.apache.commons.io.IOUtils;
import org.springframework.core.io.ClassPathResource;

public class JSTutorialUtils {
	
	public static JSTutorialUtils instance = null;
	
	public static JSTutorialUtils getInstance() {
		if (instance == null) {
			instance = new JSTutorialUtils();
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
