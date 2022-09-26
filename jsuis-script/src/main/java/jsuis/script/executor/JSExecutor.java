package jsuis.script.executor;

/**
 * Executor
 * 
 * @author Yassuo Toda
 */
public abstract class JSExecutor<T> {

	public T execute() throws Exception {
		run();
		return result();
	}
	
	public abstract void run() throws Exception;
	public abstract T result();
}
