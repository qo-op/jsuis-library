package jsuis.script.executor;

import java.awt.Frame;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.swing.JOptionPane;
import javax.swing.JPasswordField;
import javax.swing.JTextField;

import org.apache.http.HttpEntity;
import org.apache.http.NameValuePair;
import org.apache.http.StatusLine;
import org.apache.http.client.CookieStore;
import org.apache.http.client.HttpResponseException;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.cookie.BasicClientCookie;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;

import jsuis.gui.JSLoginDialog;
import jsuis.http.JSHttpClientBuilder;
import jsuis.script.annotation.JSRequired;

/**
 * Http post executor
 * 
 * @author Yassuo Toda
 */
public class JSHttpPost extends JSExecutor<String> {

	@JSRequired private String url;
	private Map<String, String> parameters;
	private String loginMessage;
	private String usernameParameterName;
	private String passwordParameterName;
	private String defaultUsername;
	private String json;
	private Integer timeout = 0;
	private Map<String, String> headers;
	private Map<String, String> cookies;
	private Frame frame;
	private String result;
	
	public JSHttpPost url(String url) {
		this.url = url;
		return this;
	}
	
	public JSHttpPost parameters(Map<String, String> parameters) {
		this.parameters = parameters;
		return this;
	}

	public JSHttpPost loginMessage(String loginMessage) {
		this.loginMessage = loginMessage;
		return this;
	}

	public JSHttpPost usernameParameterName(String usernameParameterName) {
		this.usernameParameterName = usernameParameterName;
		return this;
	}

	public JSHttpPost passwordParameterName(String passwordParameterName) {
		this.passwordParameterName = passwordParameterName;
		return this;
	}

	public JSHttpPost defaultUsername(String defaultUsername) {
		this.defaultUsername = defaultUsername;
		return this;
	}

	public JSHttpPost json(String json) {
		this.json = json;
		return this;
	}
	
	public JSHttpPost timeout(int timeout) {
		this.timeout = timeout;
		return this;
	}
	
	public JSHttpPost headers(Map<String, String> headers) {
		this.headers = headers;
		return this;
	}
	
	public JSHttpPost cookies(Map<String, String> cookies) {
		this.cookies = cookies;
		return this;
	}
	
	public JSHttpPost frame(Frame frame) {
		this.frame = frame;
		return this;
	}

	public String result() {
		return result;
	}

	public void run() throws Exception {
		
		HttpPost httpPost = new HttpPost(url);
		if (parameters != null || usernameParameterName != null || passwordParameterName != null) {
			List<NameValuePair> nameValuePairList = new ArrayList<NameValuePair>();
			if (parameters != null) {
				Set<String> parameterNameSet = parameters.keySet();
				for (String parameterName : parameterNameSet) {
					nameValuePairList.add(new BasicNameValuePair(parameterName, parameters.get(parameterName)));
				}
			}
			if (usernameParameterName != null || passwordParameterName != null) {
				int type = (usernameParameterName != null && passwordParameterName != null) ? JSLoginDialog.USERNAME_AND_PASSWORD : usernameParameterName != null ? JSLoginDialog.USERNAME : JSLoginDialog.PASSWORD;
				JSLoginDialog loginDialog = new JSLoginDialog(frame, type, loginMessage, defaultUsername);
				int option = loginDialog.showDialog();
				if (option != JOptionPane.OK_OPTION) {
					throw new InterruptedException();
				}
				if (usernameParameterName != null) {
					JTextField usernameTextField = loginDialog.getUsernameTextField();
					String username = usernameTextField.getText();
					nameValuePairList.add(new BasicNameValuePair(usernameParameterName, username));
					usernameTextField.setText(null);
				}
				if (passwordParameterName != null) {
					JPasswordField passwordField = loginDialog.getPasswordField();
					char[] password = passwordField.getPassword();
					nameValuePairList.add(new BasicNameValuePair(usernameParameterName, new String(password)));
					Arrays.fill(password, '0');
					passwordField.setText(null);
				}
				loginDialog.dispose();
			}
			httpPost.setEntity(new UrlEncodedFormEntity(nameValuePairList));
		} else if (json != null) {
			httpPost.setEntity(new StringEntity(json, ContentType.APPLICATION_FORM_URLENCODED));
		}
		if (timeout != null) {
			RequestConfig requestConfig = JSHttpClientBuilder.createRequestConfig(timeout);
			httpPost.setConfig(requestConfig);
		}
		if (headers != null) {
			Set<String> headerNameSet = headers.keySet();
			for (String headerName : headerNameSet) {
				httpPost.setHeader(headerName, headers.get(headerName));
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
		try (CloseableHttpResponse httpResponse = httpClient.execute(httpPost)) {
			httpEntity = httpResponse.getEntity();
			StatusLine statusLine = httpResponse.getStatusLine();
			int statusCode = statusLine.getStatusCode();
			if (statusCode >= 300) {
				EntityUtils.consumeQuietly(httpEntity);
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
