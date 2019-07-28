package jsuis.jsuislibrary;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Enumeration;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class JSButtonTutorialController {
	
	@Value("${spring.profiles.active}")
	private String profile;
	
    private static final String VERSION = JSUISTutorialUtils.getInstance().getResourceAsString("/static/version.txt").trim();
	private static final String MINOR_VERSION = JSUISTutorialUtils.getInstance().getResourceAsString("/static/minor_version.txt").trim();
	private static final String PREVIOUS_VERSION = JSUISTutorialUtils.getInstance().getResourceAsString("/static/previous_version.txt").trim();
    
	@RequestMapping("/tutorials/jsbutton")
	public void jsbuttontutorial(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
	    String args = "";
	    Enumeration<String> parameterNames = request.getParameterNames();
	    while (parameterNames.hasMoreElements()) {
	    	String parameterName = parameterNames.nextElement();
	    	args += "\"" + parameterName + "\":" + request.getParameter(parameterName) + ",";
	    }
	    if (args.endsWith(",")) {
	    	args = "{" + args.substring(0, args.length() - 1) + "}";
	    }
	    
		request.setAttribute("version", VERSION + "." + MINOR_VERSION);
		request.setAttribute("previous_version", PREVIOUS_VERSION);
		if ("development".equals(profile)) {
		    String date = new SimpleDateFormat("yyyyMMddHHmmss").format(Calendar.getInstance().getTime());
			request.setAttribute("build", "?" + date);
		} else {
			request.setAttribute("build", "");
		}
		request.setAttribute("args", args);
		
		request.getRequestDispatcher("/jsp/tutorials/jsbutton.jsp").forward(request, response);
	}
}
