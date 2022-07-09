package jsuis.script.visitor;

import jsuis.script.task.JSTask;
import jsuis.script.task.general.JSAddTask;
import jsuis.script.task.general.JSBreakTask;
import jsuis.script.task.general.JSCallTask;
import jsuis.script.task.general.JSDeclareTask;
import jsuis.script.task.general.JSForTask;
import jsuis.script.task.general.JSFunctionTask;
import jsuis.script.task.general.JSGetTask;
import jsuis.script.task.general.JSIfTask;
import jsuis.script.task.general.JSLengthTask;
import jsuis.script.task.general.JSLogTask;
import jsuis.script.task.general.JSPutTask;
import jsuis.script.task.general.JSReturnTask;
import jsuis.script.task.general.JSSetTask;
import jsuis.script.task.general.JSStartTask;
import jsuis.script.task.general.JSThrowTask;
import jsuis.script.task.general.JSTryCatchTask;
import jsuis.script.task.general.JSWhileTask;

/**
 * Task visitor
 * 
 * @author Yassuo Toda
 */
public interface JSTaskVisitor<T> {

	public T visitAddTask(JSAddTask task);
	public T visitBreakTask(JSBreakTask task);
	public T visitCallTask(JSCallTask task);
	public T visitDeclareTask(JSDeclareTask task);
	public T visitForTask(JSForTask task);
	public T visitFunctiontTask(JSFunctionTask task);
	public T visitGetTask(JSGetTask task);
	public T visitIfTask(JSIfTask task);
	public T visitLengthTask(JSLengthTask task);
	public T visitLogTask(JSLogTask task);
	public T visitPutTask(JSPutTask task);
	public T visitReturnTask(JSReturnTask task);
	public T visitSetTask(JSSetTask task);
	public T visitStartTask(JSStartTask task);
	public T visitThrowTask(JSThrowTask task);
	public T visitTryCatchTask(JSTryCatchTask task);
	public T visitWhileTask(JSWhileTask task);
	
	public T visitTask(JSTask task);
}
