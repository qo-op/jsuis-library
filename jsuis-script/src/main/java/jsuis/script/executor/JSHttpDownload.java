package jsuis.script.executor;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.InputStream;
import java.nio.file.AccessDeniedException;
import java.nio.file.FileAlreadyExistsException;
import java.nio.file.Files;
import java.nio.file.NotDirectoryException;
import java.util.Date;
import java.util.Map;
import java.util.Set;

import org.apache.commons.io.FileUtils;
import org.apache.http.Header;
import org.apache.http.HeaderElement;
import org.apache.http.HttpEntity;
import org.apache.http.NameValuePair;
import org.apache.http.StatusLine;
import org.apache.http.client.CookieStore;
import org.apache.http.client.HttpResponseException;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.utils.DateUtils;
import org.apache.http.client.utils.URIBuilder;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.cookie.BasicClientCookie;
import org.apache.http.util.EntityUtils;

import jsuis.file.JSFile;
import jsuis.http.JSHttpClientBuilder;
import jsuis.script.annotation.JSRequired;

/**
 * Http download executor
 * 
 * @author Yassuo Toda
 */
public class JSHttpDownload extends JSExecutor<File> {

	private File destination = new JSFile("~\\Downloads\\");
	private String fileName;
	private Boolean overwrite = false;
	private Boolean preserve = true;
	@JSRequired private String url;
	private Map<String, String> parameters;
	private Integer timeout = 0;
	private Map<String, String> headers;
	private Map<String, String> cookies;
	private File result;
	
	public JSHttpDownload destination(File destination) {
		this.destination = destination;
		return this;
	}
	
	public JSHttpDownload fileName(String fileName) {
		this.fileName = fileName;
		return this;
	}
	
	public JSHttpDownload overwrite(Boolean overwrite) {
		this.overwrite = overwrite;
		return this;
	}

	public JSHttpDownload preserve(Boolean preserve) {
		this.preserve = preserve;
		return this;
	}
	
	public JSHttpDownload url(String url) {
		this.url = url;
		return this;
	}
	
	public JSHttpDownload parameters(Map<String, String> parameters) {
		this.parameters = parameters;
		return this;
	}
	
	public JSHttpDownload timeout(int timeout) {
		this.timeout = timeout;
		return this;
	}
	
	public JSHttpDownload headers(Map<String, String> headers) {
		this.headers = headers;
		return this;
	}
	
	public JSHttpDownload cookies(Map<String, String> cookies) {
		this.cookies = cookies;
		return this;
	}

	public File result() {
		return result;
	}
	
	public void run() throws Exception {
		
		if (Files.exists(destination.toPath())) {
			if (!Files.isDirectory(destination.toPath())) {
				throw new NotDirectoryException(destination.getAbsolutePath());
			}
		} else if (Files.notExists(destination.toPath())) {
			Files.createDirectories(destination.toPath());
		} else {
			throw new AccessDeniedException(destination.getAbsolutePath());
		}
		URIBuilder uriBuilder = new URIBuilder(url);
		if (parameters != null) {
			Set<String> parameterNameSet = parameters.keySet();
			for (String parameterName : parameterNameSet) {
				uriBuilder.addParameter(parameterName, parameters.get(parameterName));
			}
		}
		HttpGet httpGet = new HttpGet(uriBuilder.build());
		if (timeout != null) {
			RequestConfig requestConfig = JSHttpClientBuilder.createRequestConfig(timeout);
			httpGet.setConfig(requestConfig);
		}
		if (headers != null) {
			Set<String> headerNameSet = headers.keySet();
			for (String headerName : headerNameSet) {
				httpGet.setHeader(headerName, headers.get(headerName));
			}
		}
		if (cookies != null) {
			CookieStore cookieStore = JSHttpClientBuilder.getCookieStore();
			Set<String> cookieNameSet = cookies.keySet();
			for (String cookieName : cookieNameSet) {
				cookieStore.addCookie(new BasicClientCookie(cookieName, cookies.get(cookieName)));
			}
		}
		
		HttpEntity httpEntity = null;
		CloseableHttpClient httpClient = JSHttpClientBuilder.getHttpClient();
		try (CloseableHttpResponse httpResponse = httpClient.execute(httpGet)) {
			httpEntity = httpResponse.getEntity();
			StatusLine statusLine = httpResponse.getStatusLine();
			int statusCode = statusLine.getStatusCode();
			if (statusCode >= 300) {
				throw new HttpResponseException(statusCode, statusLine.getReasonPhrase());
			}
			if (fileName == null) {
				Header contentDispositionHeader = httpResponse.getLastHeader("Content-Disposition");
				if (contentDispositionHeader != null) {
					HeaderElement[] contentDispositionHeaderElements = contentDispositionHeader.getElements();
					for (HeaderElement contentDispositionHeaderElement : contentDispositionHeaderElements) {
						if ("attachment".equalsIgnoreCase(contentDispositionHeaderElement.getName())) {
							NameValuePair fileNameValuePair = contentDispositionHeaderElement.getParameterByName("filename");
							if (fileNameValuePair != null) {
								fileName = fileNameValuePair.getValue();
							}
						}
					}
				}
			}
			if (fileName == null) {
				throw new FileNotFoundException();
			}
			File file = new File(destination, fileName);
			if (Files.exists(file.toPath()) && !overwrite) {
				throw new FileAlreadyExistsException(file.getAbsolutePath());
			}
			InputStream inputStream = httpEntity.getContent();
			FileUtils.copyInputStreamToFile(inputStream, file);
			if (preserve) {
				Header lastModifiedHeader = httpResponse.getLastHeader("Last-Modified");
				if (lastModifiedHeader != null) {
					Date lastModifiedDate = DateUtils.parseDate(lastModifiedHeader.getValue());
					file.setLastModified(lastModifiedDate.getTime());
				}
			}
			result = file;
		} finally {
			if (httpEntity != null) {
				EntityUtils.consumeQuietly(httpEntity);
			}
		}
	}
}
