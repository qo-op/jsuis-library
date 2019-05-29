package jsuis.jsuislibrary.tutorial;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import jsuis.jsuislibrary.tutorial.JSTutorialUtils;

@Controller
public class JSTutorialController {
	
	private static final String VERSION = JSTutorialUtils.getResourceAsString("/static/version.txt");
    private static final String JSTUTORIAL = JSTutorialUtils.getResourceAsString("/templates/jstutorial.html");
	
	@RequestMapping("/")
	@ResponseBody
	public String root(HttpServletRequest request, HttpServletResponse response) {
		
	    response.setContentType("text/html");
	    response.setCharacterEncoding("ISO-8859-1");

	    return JSTUTORIAL
	    		.replace("${version}", VERSION)
	    		.replace("${title}", "JSUIS - JavaScript User Interface")
	    		.replace("${class}", "jstutorial.JSFrame_JSTutorial")
	    		;
	}
}
