package jsuis.jsuislibrary;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Enumeration;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import jsuis.jsuislibrary.JSTutorialUtils;

@Controller
public class JSButtonTutorialController {
	
    private static final String VERSION = JSTutorialUtils.getInstance().getResourceAsString("/static/version.txt").trim();
	private static final String PREVIOUS_VERSION = JSTutorialUtils.getInstance().getResourceAsString("/static/previous_version.txt").trim();
    
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
	    
	    String date = new SimpleDateFormat("yyyyMMddHHmmss").format(Calendar.getInstance().getTime());
		
		request.setAttribute("version", VERSION);
		request.setAttribute("previous_version", PREVIOUS_VERSION);
		request.setAttribute("build", "?" + date);
		request.setAttribute("title", "How to use JS Button");
		request.setAttribute("clazz", "jstutorial.JSFrame_JSButtonTutorial");
		request.setAttribute("args", args);
		
		request.getRequestDispatcher("/jsp/tutorials/jsbutton.jsp").forward(request, response);
	}
}