package jsuis.maven.plugin;

import java.util.Map;

import org.apache.maven.plugins.annotations.Parameter;

import jsuis.script.task.http.JSHttpDownloadTask;

/**
 * Http download task
 * 
 * @author Yassuo Toda
 */
public class HttpDownloadTask extends JSHttpDownloadTask {

    @Parameter
	private Map<String, Object> parameterMap;
}
