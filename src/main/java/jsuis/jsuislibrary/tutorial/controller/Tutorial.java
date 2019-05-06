package jsuis.jsuislibrary.tutorial.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class Tutorial {

	private String model =
			"<html>" + "\n" +
				"<head>" + "\n" +
					"<title>${title}</title>" + "\n" +
					"<link rel='stylesheet' href='css/jsuis.css'>" + "\n" +
					"<script src='/js/lib/jsuis.js'></script>" + "\n" +
					"<script src='/js/tutorial.js'></script>" + "\n" +
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

	    return model
	    		.replace("${title}", "How to use JS Frames")
	    		.replace("${class}", "JSTutorial")
	    		;
	}
	
	@RequestMapping("/button.html")
	@ResponseBody
	public String button(HttpServletRequest request, HttpServletResponse response) {
		
	    response.setContentType("text/html");
	    response.setCharacterEncoding("UTF-8");

	    return model
	    		.replace("${title}", "How to use JS Buttons")
	    		.replace("${class}", "JSButtonTutorial")
	    		;
	}
}
