package jsuis.jsuislibrary;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class JSUISCSSDownload {
	
	private static final String PREVIOUS_VERSION = JSTutorialUtils.getInstance().getResourceAsString("/static/previous_version.txt").trim();
	
	@RequestMapping("/download/jsuiscss")
	public void downloadjsuiscss(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	    response.setHeader("Content-Disposition", "attachment; filename=\"jsuis-" + PREVIOUS_VERSION + ".css\"");
	}
}
