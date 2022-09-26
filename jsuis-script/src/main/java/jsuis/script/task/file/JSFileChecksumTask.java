package jsuis.script.task.file;

import java.io.File;
import java.security.MessageDigest;
import java.util.Map;

import org.apache.commons.codec.binary.Hex;
import org.apache.commons.codec.digest.DigestUtils;

import jsuis.script.annotation.JSParameter;
import jsuis.script.task.JSTask;
import jsuis.script.visitor.JSTaskVisitor;

/**
 * File checksum task
 * 
 * variable = File.checksum(file, algorithm)
 * 
 * @author Yassuo Toda
 */
public class JSFileChecksumTask extends JSTask {
	
	@JSParameter(name = "variable")
	@JSParameter(type = File.class, name = "file")
	@JSParameter(name = "algorithm", component = "Combo")
	@JSParameter(type = String.class, label = "MD5")
	@JSParameter(type = String.class, label = "SHA-1")
	private Map<String, Object> parameterMap;

	@Override
	public void execute() throws Exception {
		
		String variable = getString("variable");
		File file = getFile("file");
		String algorithm = getString("algorithm");
		
		MessageDigest messageDigest = MessageDigest.getInstance(algorithm);
		String checksum = Hex.encodeHexString(DigestUtils.updateDigest(messageDigest, file).digest());

		getBlock().set(variable, checksum);
	}

	@Override
	public <T> T accept(JSTaskVisitor<T> visitor) {
		return visitor.visitFileChecksumTask(this);
	}
}
