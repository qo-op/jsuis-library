package jsuis.jsuislibrary;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class JsuisJsDownload {
	
	private static final String VERSION = JSTutorialUtils.getInstance().getResourceAsString("/static/version.txt").trim();
	private static final String MINOR_VERSION = JSTutorialUtils.getInstance().getResourceAsString("/static/minor_version.txt").trim();
	private static final String PREVIOUS_VERSION = JSTutorialUtils.getInstance().getResourceAsString("/static/previous_version.txt").trim();
	
	@RequestMapping("/download/jsuisbetajs")
	public void downloadjsuisbetajs(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	    response.setHeader("Content-Disposition", "attachment; filename=\"jsuis-" + VERSION + "." + MINOR_VERSION + ".js\"");
	}
	
	@RequestMapping("/download/jsuisstablejs")
	public void downloadjsuisstablejs(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	    response.setHeader("Content-Disposition", "attachment; filename=\"jsuis-" + PREVIOUS_VERSION + ".js\"");
	}
}
