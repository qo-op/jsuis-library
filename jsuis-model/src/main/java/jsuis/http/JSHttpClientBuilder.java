package jsuis.http;

import java.io.IOException;
import java.security.KeyManagementException;
import java.security.KeyStore;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
import java.security.UnrecoverableKeyException;
import java.security.cert.CertificateException;

import javax.net.ssl.KeyManager;
import javax.net.ssl.KeyManagerFactory;
import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManager;
import javax.net.ssl.TrustManagerFactory;
import javax.net.ssl.X509KeyManager;
import javax.net.ssl.X509TrustManager;

import org.apache.commons.lang.SystemUtils;
import org.apache.http.client.CookieStore;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.conn.ssl.SSLConnectionSocketFactory;
import org.apache.http.impl.client.BasicCookieStore;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.impl.client.LaxRedirectStrategy;

/**
 * Http client buildder
 * 
 * @author Yassuo Toda
 */
public class JSHttpClientBuilder {
	
	private static CloseableHttpClient httpClient;
	
	public static CloseableHttpClient getHttpClient() throws KeyManagementException, UnrecoverableKeyException, NoSuchAlgorithmException, KeyStoreException, CertificateException, IOException {
		if (httpClient == null) {
			httpClient = createHttpClient(getCookieStore());
		    Runtime.getRuntime().addShutdownHook(new Thread() {
		        @Override
		        public void run() {
		        	try {
						httpClient.close();
					} catch (IOException e) {
					}
		        }
		    });
		}
		return httpClient;
	}
	
	private static CookieStore cookieStore;
	
	public static CookieStore getCookieStore() {
		if (cookieStore == null) {
			cookieStore = new BasicCookieStore();
		}
		return cookieStore;
	}
	
	public static CloseableHttpClient createHttpClient(CookieStore cookieStore) throws KeyManagementException, UnrecoverableKeyException, NoSuchAlgorithmException, KeyStoreException, CertificateException, IOException {
		return HttpClients
				.custom()
				.setSSLSocketFactory(createSSLConnectionSocketFactory())
				.setRedirectStrategy(new LaxRedirectStrategy())
				.setDefaultCookieStore(cookieStore)
				.build();
	}
	
	public static RequestConfig createRequestConfig(int timeout) {
		return RequestConfig
				.custom()
				.setConnectionRequestTimeout(timeout)
				.setConnectTimeout(timeout)
				.setSocketTimeout(timeout)
				.build();
	}
	
	public static SSLConnectionSocketFactory createSSLConnectionSocketFactory() throws KeyManagementException, UnrecoverableKeyException, NoSuchAlgorithmException, KeyStoreException, CertificateException, IOException {
		return new SSLConnectionSocketFactory(createSSLContext());
	}
	
	public static SSLContext createSSLContext() throws KeyManagementException, UnrecoverableKeyException, NoSuchAlgorithmException, KeyStoreException, CertificateException, IOException {
		return createSSLContext(createKeyManagers(), createTrustManagers());
	}
	
	public static SSLContext createSSLContext(KeyManager[] keyManagers, TrustManager[] trustManagers) throws NoSuchAlgorithmException, KeyManagementException {
		SSLContext sslcontext = SSLContext.getInstance("SSL");
		sslcontext.init(keyManagers, trustManagers, null);
		return sslcontext;
	}

	public static KeyManager[] createKeyManagers() {
		if (SystemUtils.IS_OS_WINDOWS) {
			try {
				KeyStore keyStore = KeyStore.getInstance("Windows-MY");
				keyStore.load(null, null);
				return createKeyManagers(keyStore);
			} catch (KeyStoreException | NoSuchAlgorithmException | CertificateException | IOException | UnrecoverableKeyException e) {
			}
		}
		return null;
	}
	
	public static KeyManager[] createKeyManagers(KeyStore keyStore) throws NoSuchAlgorithmException, UnrecoverableKeyException, KeyStoreException {
	    KeyManagerFactory keyManagerFactory = KeyManagerFactory.getInstance(KeyManagerFactory.getDefaultAlgorithm());
	    keyManagerFactory.init(keyStore, null);
	    KeyManager[] keyManagers = keyManagerFactory.getKeyManagers();
	    for (int i = 0; i < keyManagers.length; i++) {
	    	if (keyManagers[i] instanceof X509KeyManager) {
	    		keyManagers[i] = new JSX509KeyManager((X509KeyManager) keyManagers[i]);
	    	}
	    }
	    return keyManagers;
	}
	
	public static TrustManager[] createTrustManagers() throws KeyStoreException, NoSuchAlgorithmException, CertificateException, IOException {
		return createTrustManagers(null);
	}
	
	public static TrustManager[] createTrustManagers(KeyStore trustStore) throws NoSuchAlgorithmException, KeyStoreException {
	    TrustManagerFactory trustManagerFactory = TrustManagerFactory.getInstance(TrustManagerFactory.getDefaultAlgorithm());
	    trustManagerFactory.init(trustStore);
	    TrustManager[] trustManagers = trustManagerFactory.getTrustManagers();
	    for (int i = 0; i < trustManagers.length; i++) {
	    	if (trustManagers[i] instanceof X509TrustManager) {
	    		trustManagers[i] = new JSX509TrustManager((X509TrustManager) trustManagers[i]);
	    	}
	    }
	    return trustManagers;
	}
}
