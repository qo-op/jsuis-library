package jsuis.http;

import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;

import javax.net.ssl.X509TrustManager;

/**
 * X509 trust manager
 * 
 * Based on the example found at https://docs.oracle.com/javase/10/security/java-secure-socket-extension-jsse-reference-guide.htm
 * 
 * @author Yassuo Toda
 */
public class JSX509TrustManager implements X509TrustManager {
	
	private X509TrustManager x509TrustManager;
	
	public JSX509TrustManager(X509TrustManager x509TrustManager) {
	    this.x509TrustManager = x509TrustManager;
	}
	
	@Override
	public void checkClientTrusted(X509Certificate[] chain, String authType) throws CertificateException {
		try {
			x509TrustManager.checkClientTrusted(chain, authType);
		} catch (CertificateException e) {
		}
	}

	@Override
	public void checkServerTrusted(X509Certificate[] chain, String authType) throws CertificateException {
		try {
			x509TrustManager.checkServerTrusted(chain, authType);
		} catch (CertificateException e) {
			if (chain == null || chain.length == 0) {
				throw new CertificateException("No server certificates found!");
			}
			// TODO: Pop up a dialog box asking whether to trust the certificate chain.
		}
	}

	@Override
	public X509Certificate[] getAcceptedIssuers() {
		return x509TrustManager.getAcceptedIssuers();
	}
}
