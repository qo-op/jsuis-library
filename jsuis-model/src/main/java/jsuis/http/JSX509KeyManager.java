package jsuis.http;

import java.net.Socket;
import java.security.Principal;
import java.security.PrivateKey;
import java.security.cert.X509Certificate;
import java.util.ArrayList;
import java.util.List;

import javax.net.ssl.X509KeyManager;

/**
 * X509 key manager
 * 
 * @author Yassuo Toda
 */
public class JSX509KeyManager implements X509KeyManager {

	private X509KeyManager x509KeyManager;
	
	public JSX509KeyManager(X509KeyManager x509KeyManager) {
		this.x509KeyManager = x509KeyManager;
	}
	
	@Override
	public String chooseClientAlias(String[] keyTypes, Principal[] issuers, Socket socket) {
		List<String> clientAliasList = new ArrayList<>();
		long currentTimeMillis = System.currentTimeMillis();
		for (String keyType : keyTypes) {
			String[] clientAliases = getClientAliases(keyType, issuers);
			if (clientAliases == null || clientAliases.length == 0) {
				continue;
			}
			for (String clientAlias : clientAliases) {
				boolean valid = true;
				X509Certificate[] certificates = getCertificateChain(clientAlias);
				for (X509Certificate certificate : certificates) {
					if (currentTimeMillis < certificate.getNotBefore().getTime()
							|| currentTimeMillis > certificate.getNotAfter().getTime()) {
						valid = false;
						break;
					}
				}
				if (valid) {
					clientAliasList.add(clientAlias);
				}
			}
		}
		int clientAliasListSize = clientAliasList.size();
		switch (clientAliasListSize) {
		case 0:
			return null;
		case 1:
			return clientAliasList.get(0);
		default:
			// TODO: Pop up a dialog box asking to select an alias.
			return clientAliasList.get(0);
		}
	}

	@Override
	public String chooseServerAlias(String keyType, Principal[] issuers, Socket socket) {
		return x509KeyManager.chooseServerAlias(keyType, issuers, socket);
	}

	@Override
	public X509Certificate[] getCertificateChain(String alias) {
		return x509KeyManager.getCertificateChain(alias);
	}

	@Override
	public String[] getClientAliases(String keyType, Principal[] issuers) {
		return x509KeyManager.getClientAliases(keyType, issuers);
	}

	@Override
	public PrivateKey getPrivateKey(String alias) {
		return x509KeyManager.getPrivateKey(alias);
	}

	@Override
	public String[] getServerAliases(String keyType, Principal[] issuers) {
		return x509KeyManager.getServerAliases(keyType, issuers);
	}
}
