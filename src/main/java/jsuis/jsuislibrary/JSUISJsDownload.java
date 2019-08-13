package jsuis.jsuislibrary;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.IOUtils;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class JSUISJsDownload {
	
	private static final String VERSION = getResourceAsString("/static/version.txt").trim();
	private static final String MINOR_VERSION = getResourceAsString("/static/minor_version.txt").trim();
	private static final String PREVIOUS_VERSION = getResourceAsString("/static/previous_version.txt").trim();
	private static String getResourceAsString(String resource) {
		try {
			return IOUtils.toString(new ClassPathResource(resource).getInputStream(), "ISO-8859-1");
		} catch (IOException e) {
			return null;
		}
	}
	
	@RequestMapping("/download/jsuisbetajs")
	public void downloadjsuisbetajs(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	    response.setHeader("Content-Disposition", "attachment; filename=\"jsuis-" + VERSION + "." + MINOR_VERSION + ".js\"");
	}
	
	@RequestMapping("/download/jsuisstablejs")
	public void downloadjsuisstablejs(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	    response.setHeader("Content-Disposition", "attachment; filename=\"jsuis-" + PREVIOUS_VERSION + ".js\"");
	}
}
