package jsuis.script.task.date;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

import jsuis.script.annotation.JSParameter;
import jsuis.script.task.JSTask;
import jsuis.script.visitor.JSTaskVisitor;

/**
 * Date format task
 * 
 * @author Yassuo Toda
 */
public class JSDateFormatTask extends JSTask {

	@JSParameter(name = "variable")
	@JSParameter(name = "date")
	@JSParameter(name = "format")
	private Map<String, Object> parameterMap;

	@Override
	public void execute() throws Exception {
		
		String variable = getString("variable");
		Object object = getObject("date");
		if (!(object instanceof Date)) {
			throw new Exception(String.format("Object '%s' is not a Date", object));
		}
		Date date = (Date) object;
		String format = getString("format");
		String text = new SimpleDateFormat(format).format(date);
		getBlock().set(variable, text);
	}

	@Override
	public <T> T accept(JSTaskVisitor<T> visitor) {
		return visitor.visitDateFormatTask(this);
	}
}
