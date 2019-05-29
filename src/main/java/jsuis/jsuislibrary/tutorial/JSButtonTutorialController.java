package jsuis.jsuislibrary.tutorial;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import jsuis.jsuislibrary.tutorial.JSTutorialUtils;

@Controller
public class JSButtonTutorialController {
	
	private static final String VERSION = JSTutorialUtils.getResourceAsString("/static/version.txt");
    private static final String TUTORIALS_JSBUTTON = JSTutorialUtils.getResourceAsString("/templates/tutorials/jsbutton.html");
	
	@RequestMapping("/tutorials/jsbutton")
	@ResponseBody
	public String jsbutton(HttpServletRequest request, HttpServletResponse response) {
		
	    response.setContentType("text/html");
	    response.setCharacterEncoding("ISO-8859-1");

	    return TUTORIALS_JSBUTTON
	    		.replace("${version}", VERSION)
	    		.replace("${title}", "How to use JS Button")
	    		.replace("${class}", "jstutorial.JSFrame_JSButtonTutorial")
	    		;
	}
}
