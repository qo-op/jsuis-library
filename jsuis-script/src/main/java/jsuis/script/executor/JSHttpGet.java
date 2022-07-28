package jsuis.script.executor;

import java.util.Map;
import java.util.Set;

import org.apache.http.HttpEntity;
import org.apache.http.StatusLine;
import org.apache.http.client.CookieStore;
import org.apache.http.client.HttpResponseException;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.utils.URIBuilder;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.cookie.BasicClientCookie;
import org.apache.http.util.EntityUtils;

import jsuis.http.JSHttpClientBuilder;
import jsuis.script.annotation.JSRequired;

/**
 * Http get executor
 * 
 * @author Yassuo Toda
 */
public class JSHttpGet extends JSExecutor<String> {

	@JSRequired private String url;
	private Map<String, String> parameters;
	private Integer timeout = 0;
	private Map<String, String> headers;
	private Map<String, String> cookies;
	private String result;
	
	public JSHttpGet url(String url) {
		this.url = url;
		return this;
	}
	
	public JSHttpGet parameters(Map<String, String> parameters) {
		this.parameters = parameters;
		return this;
	}
	
	public JSHttpGet timeout(int timeout) {
		this.timeout = timeout;
		return this;
	}
	
	public JSHttpGet headers(Map<String, String> headers) {
		this.headers = headers;
		return this;
	}
	
	public JSHttpGet cookies(Map<String, String> cookies) {
		this.cookies = cookies;
		return this;
	}

	public String result() {
		return result;
	}

	public void run() throws Exception {
		
		URIBuilder uriBuilder = new URIBuilder(url);
		if (parameters != null) {
			Set<String> parameterNameSet = parameters.keySet();
			for (String parameterName : parameterNameSet) {
				uriBuilder.addParameter(parameterName, parameters.get(parameterName));
			}
		}
		HttpGet httpGet = new HttpGet(uriBuilder.build());
		if (timeout != null) {
			RequestConfig requestConfig = JSHttpClientBuilder.createRequestConfig(timeout * 1000);
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
			result = EntityUtils.toString(httpEntity);
		} finally {
			if (httpEntity != null) {
				EntityUtils.consumeQuietly(httpEntity);
			}
		}
	}
}
