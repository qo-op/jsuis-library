package jsuis.jsuislibrary.tutorial.controller;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.IOUtils;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class JSTutorialController {
	
	private static String JSUIS_VERSION = "";
	
	static {
		Resource resource = new ClassPathResource("static/version.txt");
		try {
			JSUIS_VERSION = IOUtils.toString(resource.getInputStream(), "ISO-8859-1");
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	private static String HTML =
			"<!DOCTYPE html>" + "\n" +
			"<html>" + "\n" +
				"<head>" + "\n" +
					"<title>${title}</title>" + "\n" +
					"<link rel='stylesheet' href='/css/jsuis-" + JSUIS_VERSION + ".css'>" + "\n" +
					"<link rel='stylesheet' href='/css/jstutorial-" + JSUIS_VERSION + ".css'>" + "\n" +
					"<script src='/js/jsuis-" + JSUIS_VERSION + ".js'></script>" + "\n" +
					"<script src='/js/jstutorial-" + JSUIS_VERSION + ".js'></script>" + "\n" +
				"</head>" + "\n" +
				"<body>" + "\n" +
					"<script>" + "\n" +
						"addEventListener('load', function() {" + "\n" +
							"new ${class}().setVisible(true);" + "\n" +
						"});" + "\n" +
					"</script>" + "\n" +
				"</body>" + "\n" +
			"</html>" + "\n"
			;
	
	@RequestMapping("/")
	@ResponseBody
	public String root(HttpServletRequest request, HttpServletResponse response) {
		
	    response.setContentType("text/html");
	    response.setCharacterEncoding("UTF-8");

	    return HTML
	    		.replace("${title}", "JSUIS - JavaScript User Interface")
	    		.replace("${class}", "jstutorial.JSFrame_JSTutorial")
	    		;
	}
	
	@RequestMapping("/tutorials/jsuis.html")
	@ResponseBody
	public String jsuis(HttpServletRequest request, HttpServletResponse response) {
		
	    response.setContentType("text/html");
	    response.setCharacterEncoding("UTF-8");

	    return HTML
	    		.replace("${title}", "How to use JSUIS")
	    		.replace("${class}", "jstutorial.JSFrame_JSUISTutorial")
	    		;
	}
	
	@RequestMapping("/tutorials/jsbutton.html")
	@ResponseBody
	public String jsbutton(HttpServletRequest request, HttpServletResponse response) {
		
	    response.setContentType("text/html");
	    response.setCharacterEncoding("UTF-8");

	    return HTML
	    		.replace("${title}", "How to use JS Button")
	    		.replace("${class}", "jstutorial.JSFrame_JSButtonTutorial")
	    		;
	}
}
