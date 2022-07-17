package jsuis.script.visitor;

import jsuis.script.task.JSTask;
import jsuis.script.task.directory.JSDirectoryCopyTask;
import jsuis.script.task.directory.JSDirectoryListTask;
import jsuis.script.task.directory.JSDirectoryZipTask;
import jsuis.script.task.file.JSFileChecksumTask;
import jsuis.script.task.file.JSFileCopyTask;
import jsuis.script.task.file.JSFileDeleteTask;
import jsuis.script.task.file.JSFileExistsTask;
import jsuis.script.task.file.JSFileZipTask;
import jsuis.script.task.general.JSAddTask;
import jsuis.script.task.general.JSBreakTask;
import jsuis.script.task.general.JSCallTask;
import jsuis.script.task.general.JSClearTask;
import jsuis.script.task.general.JSDeclareTask;
import jsuis.script.task.general.JSForEachTask;
import jsuis.script.task.general.JSForTask;
import jsuis.script.task.general.JSFunctionTask;
import jsuis.script.task.general.JSGetTask;
import jsuis.script.task.general.JSIfTask;
import jsuis.script.task.general.JSLengthTask;
import jsuis.script.task.general.JSLogTask;
import jsuis.script.task.general.JSProcessTask;
import jsuis.script.task.general.JSPutTask;
import jsuis.script.task.general.JSRemoveTask;
import jsuis.script.task.general.JSReturnTask;
import jsuis.script.task.general.JSSetTask;
import jsuis.script.task.general.JSStartTask;
import jsuis.script.task.general.JSThrowTask;
import jsuis.script.task.general.JSTryCatchTask;
import jsuis.script.task.general.JSWhileTask;
import jsuis.script.task.general.JSWorkTask;
import jsuis.script.task.http.JSHttpDownloadTask;
import jsuis.script.task.text.JSTextReplaceTask;
import jsuis.script.task.text.JSTextSliceTask;

/**
 * Task visitor
 * 
 * @author Yassuo Toda
 */
public interface JSTaskVisitor<T> {

	public T visitAddTask(JSAddTask task);
	public T visitBreakTask(JSBreakTask task);
	public T visitCallTask(JSCallTask task);
	public T visitClearTask(JSClearTask task);
	public T visitDeclareTask(JSDeclareTask task);
	public T visitForTask(JSForTask task);
	public T visitForEachTask(JSForEachTask task);
	public T visitFunctiontTask(JSFunctionTask task);
	public T visitGetTask(JSGetTask task);
	public T visitIfTask(JSIfTask task);
	public T visitLengthTask(JSLengthTask task);
	public T visitLogTask(JSLogTask task);
	public T visitProcessTask(JSProcessTask task);
	public T visitPutTask(JSPutTask task);
	public T visitRemoveTask(JSRemoveTask task);
	public T visitReturnTask(JSReturnTask task);
	public T visitSetTask(JSSetTask task);
	public T visitStartTask(JSStartTask task);
	public T visitThrowTask(JSThrowTask task);
	public T visitTryCatchTask(JSTryCatchTask task);
	public T visitWhileTask(JSWhileTask task);
	public T visitWorkTask(JSWorkTask task);

	public T visitDirectoryCopyTask(JSDirectoryCopyTask task);
	public T visitDirectoryListTask(JSDirectoryListTask task);
	public T visitDirectoryZipTask(JSDirectoryZipTask task);

	public T visitFileChecksumTask(JSFileChecksumTask task);
	public T visitFileCopyTask(JSFileCopyTask task);
	public T visitFileDeleteTask(JSFileDeleteTask task);
	public T visitFileExistsTask(JSFileExistsTask task);
	public T visitFileZipTask(JSFileZipTask task);
	
	public T visitHttpDownloadTask(JSHttpDownloadTask task);
	
	public T visitTextReplaceTask(JSTextReplaceTask task);
	public T visitTextSliceTask(JSTextSliceTask task);
	
	public T visitTask(JSTask task);
}
