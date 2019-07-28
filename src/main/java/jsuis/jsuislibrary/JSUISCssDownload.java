package jsuis.jsuislibrary;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class JSUISCssDownload {
	
	private static final String VERSION = JSUISTutorialUtils.getInstance().getResourceAsString("/static/version.txt").trim();
	private static final String MINOR_VERSION = JSUISTutorialUtils.getInstance().getResourceAsString("/static/minor_version.txt").trim();
	private static final String PREVIOUS_VERSION = JSUISTutorialUtils.getInstance().getResourceAsString("/static/previous_version.txt").trim();
	
	@RequestMapping("/download/jsuisbetacss")
	public void downloadjsuisbetacss(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	    response.setHeader("Content-Disposition", "attachment; filename=\"jsuis-" + VERSION + "." + MINOR_VERSION + ".css\"");
	}
	
	@RequestMapping("/download/jsuisstablecss")
	public void downloadjsuisstablecss(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	    response.setHeader("Content-Disposition", "attachment; filename=\"jsuis-" + PREVIOUS_VERSION + ".css\"");
	}
}
