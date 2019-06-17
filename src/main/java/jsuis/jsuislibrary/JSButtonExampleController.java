package jsuis.jsuislibrary;

import java.io.IOException;
import java.util.Enumeration;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class JSButtonExampleController {
	
	private static final String VERSION = JSTutorialUtils.getInstance().getResourceAsString("/static/version.txt").trim();
	private static final String PREVIOUS_VERSION = JSTutorialUtils.getInstance().getResourceAsString("/static/previous_version.txt").trim();
	
	@RequestMapping("/examples/jsbutton")
	public void jsbuttonexample(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
	    String args = "";
	    Enumeration<String> parameterNames = request.getParameterNames();
	    while (parameterNames.hasMoreElements()) {
	    	String parameterName = parameterNames.nextElement();
	    	args += "\"" + parameterName + "\":" + request.getParameter(parameterName) + ",";
	    }
	    if (args.endsWith(",")) {
	    	args = "{" + args.substring(0, args.length() - 1) + "}";
	    }
	    
		request.setAttribute("version", VERSION);
		request.setAttribute("previous_version", PREVIOUS_VERSION);
		request.setAttribute("build", JSTutorialUtils.getInstance().getBuild());
		request.setAttribute("args", args);
		
		request.getRequestDispatcher("/jsp/examples/jsbutton.jsp").forward(request, response);
	}
}
