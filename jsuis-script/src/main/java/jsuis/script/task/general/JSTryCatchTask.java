package jsuis.script.task.general;

import java.util.Map;

import jsuis.script.annotation.JSParameter;
import jsuis.script.task.JSTryTask;
import jsuis.script.visitor.JSTaskVisitor;

/**
 * Try task
 * 
 * try { ... } catch { ... } finally { ... }
 * 
 * @author Yassuo Toda
 */
public class JSTryCatchTask extends JSTryTask {

	@Override
	public void execute() throws Exception {
	}
	
	@JSParameter(name = "name", value = "try")
	private Map<String, Object> parameterMap;

	@Override
	public <T> T accept(JSTaskVisitor<T> visitor) {
		return visitor.visitTryCatchTask(this);
	}
}
