package jsuis.script.task.text;

import java.util.Map;

import jsuis.script.annotation.JSParameter;
import jsuis.script.executor.JSTextSlice;
import jsuis.script.task.JSTask;
import jsuis.script.visitor.JSTaskVisitor;

/**
 * Text slice task
 * 
 * @author Yassuo Toda
 */
public class JSTextSliceTask extends JSTask {
	
	@JSParameter(required = true, name = "variable")
	@JSParameter(required = true, name = "text")
	@JSParameter(name = "start", value = "0")
	@JSParameter(name = "end")
	private Map<String, Object> parameterMap;

	@Override
	public void execute() throws Exception {
		
		String variable = getString("variable");
		String text = getString("text");
		Integer start = getInteger("start");
		Integer end = getInteger("end");
		
		String result = new JSTextSlice()
				.text(text)
				.start(start)
				.end(end)
				.execute();
		
		getBlock().set(variable, result);
	}

	@Override
	public <T> T accept(JSTaskVisitor<T> visitor) {
		return visitor.visitTextSliceTask(this);
	}
}
