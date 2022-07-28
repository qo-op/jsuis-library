package jsuis.script.visitor;

import jsuis.script.task.JSTask;
import jsuis.script.task.date.JSDateFormatTask;
import jsuis.script.task.dialog.JSMessageTask;
import jsuis.script.task.directory.JSDirectoryCopyTask;
import jsuis.script.task.directory.JSDirectoryCreateTask;
import jsuis.script.task.directory.JSDirectoryDeleteTask;
import jsuis.script.task.directory.JSDirectoryListTask;
import jsuis.script.task.directory.JSDirectoryZipTask;
import jsuis.script.task.file.JSFileChecksumTask;
import jsuis.script.task.file.JSFileCopyTask;
import jsuis.script.task.file.JSFileDeleteTask;
import jsuis.script.task.file.JSFileExistsTask;
import jsuis.script.task.file.JSFileMoveTask;
import jsuis.script.task.file.JSFileRenameTask;
import jsuis.script.task.file.JSFileUnzipTask;
import jsuis.script.task.file.JSFileWriteTask;
import jsuis.script.task.file.JSFileZipTask;
import jsuis.script.task.general.JSAddTask;
import jsuis.script.task.general.JSBreakTask;
import jsuis.script.task.general.JSCallTask;
import jsuis.script.task.general.JSClearTask;
import jsuis.script.task.general.JSContinueTask;
import jsuis.script.task.general.JSEvalTask;
import jsuis.script.task.general.JSForEachTask;
import jsuis.script.task.general.JSForTask;
import jsuis.script.task.general.JSFunctionTask;
import jsuis.script.task.general.JSGetTask;
import jsuis.script.task.general.JSIfTask;
import jsuis.script.task.general.JSLengthTask;
import jsuis.script.task.general.JSLetTask;
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
import jsuis.script.task.html.JSHtmlGetTextTask;
import jsuis.script.task.http.JSHttpDownloadTask;
import jsuis.script.task.http.JSHttpGetTask;
import jsuis.script.task.http.JSHttpPostTask;
import jsuis.script.task.operator.JSEqualsTask;
import jsuis.script.task.operator.JSNotEqualsTask;
import jsuis.script.task.text.JSTextNormalizeTask;
import jsuis.script.task.text.JSTextReplaceTask;
import jsuis.script.task.text.JSTextReverseTask;
import jsuis.script.task.text.JSTextSliceTask;
import jsuis.script.task.text.JSTextToLowerCaseTask;
import jsuis.script.task.text.JSTextToUpperCaseTask;

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
	public T visitContinueTask(JSContinueTask task);
	public T visitEvalTask(JSEvalTask task);
	public T visitForTask(JSForTask task);
	public T visitForEachTask(JSForEachTask task);
	public T visitFunctiontTask(JSFunctionTask task);
	public T visitGetTask(JSGetTask task);
	public T visitIfTask(JSIfTask task);
	public T visitLengthTask(JSLengthTask task);
	public T visitLetTask(JSLetTask task);
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

	public T visitEqualsTask(JSEqualsTask task);
	public T visitNotEqualsTask(JSNotEqualsTask task);
	
	public T visitDateFormatTask(JSDateFormatTask task);
	
	public T visitMessageTask(JSMessageTask task);
	
	public T visitDirectoryCopyTask(JSDirectoryCopyTask task);
	public T visitDirectoryCreateTask(JSDirectoryCreateTask task);
	public T visitDirectoryDeleteTask(JSDirectoryDeleteTask task);
	public T visitDirectoryListTask(JSDirectoryListTask task);
	public T visitDirectoryZipTask(JSDirectoryZipTask task);

	public T visitFileChecksumTask(JSFileChecksumTask task);
	public T visitFileCopyTask(JSFileCopyTask task);
	public T visitFileDeleteTask(JSFileDeleteTask task);
	public T visitFileExistsTask(JSFileExistsTask task);
	public T visitFileMoveTask(JSFileMoveTask task);
	public T visitFileRenameTask(JSFileRenameTask task);
	public T visitFileUnzipTask(JSFileUnzipTask task);
	public T visitFileWriteTask(JSFileWriteTask task);
	public T visitFileZipTask(JSFileZipTask task);
	
	public T visitHttpDownloadTask(JSHttpDownloadTask task);
	public T visitHttpGetTask(JSHttpGetTask task);
	public T visitHttpPostTask(JSHttpPostTask task);
	
	public T visitHtmlGetElementsTask(JSHtmlGetTextTask task);
	
	public T visitTextNormalizeTask(JSTextNormalizeTask task);
	public T visitTextReplaceTask(JSTextReplaceTask task);
	public T visitTextReverseTask(JSTextReverseTask task);
	public T visitTextSliceTask(JSTextSliceTask task);
	public T visitTextToLowerCaseTask(JSTextToLowerCaseTask task);
	public T visitTextToUpperCaseTask(JSTextToUpperCaseTask task);
	
	public T visitTask(JSTask task);
}
