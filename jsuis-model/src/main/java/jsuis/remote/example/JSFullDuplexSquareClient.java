package jsuis.remote.example;

import java.io.File;
import java.io.InputStream;
import java.io.PrintStream;
import java.lang.ProcessBuilder.Redirect;
import java.util.ArrayList;
import java.util.List;

import jsuis.file.JSDirectoryUtils;
import jsuis.remote.JSFullDuplex;

/**
 * Full duplex square client example
 * 
 * @author Yassuo Toda
 */
public class JSFullDuplexSquareClient extends JSFullDuplex {

	public JSFullDuplexSquareClient(InputStream inputStream, PrintStream printStream) {
		super(inputStream, printStream);
	}

	public static void main(String[] args) throws Exception {
		
		List<File> fileList = JSDirectoryUtils.list(new File(System.getProperty("java.home")), "**/javaw.exe");
		File javaw = fileList.get(0);
		File jar = new File(JSFullDuplexSquareServer.class.getProtectionDomain().getCodeSource().getLocation().toURI());
		List<String> textList = new ArrayList<String>();
		textList.add("cmd");
		textList.add("/c");
		textList.add("" + javaw);
		textList.add("-cp");
		textList.add(jar.getAbsolutePath());
		textList.add(JSFullDuplexSquareServer.class.getName());
		textList.add("--test");
		System.out.println(textList);
		ProcessBuilder processBuilder = new ProcessBuilder(textList);
		processBuilder.redirectError(Redirect.INHERIT);
		Process process = processBuilder.start();
		InputStream inputStream = process.getInputStream();
		PrintStream printStream = new PrintStream(process.getOutputStream());
		JSFullDuplexSquareClient client = new JSFullDuplexSquareClient(inputStream, printStream);
		new Thread(new Runnable() {
			public void run() {
				client.listen();
			}
		}).start();
		System.out.println(client.request("3"));
		System.out.println(client.request("4"));
		System.out.println(client.request(""));
	}

	@Override
	public String respond(String request) {
		return null;
	}
}
