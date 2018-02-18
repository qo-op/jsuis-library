package jsuis.tool;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

/**
 * UglifyAll
 */
public class UglifyAll {
	
	public static void main(String[] args) throws IOException {
		
		System.out.println("Uglifying...");
		List<String> command = new ArrayList<String>();
		command.add("cmd");
		command.add("/c");
		command.add("uglifyall.bat");
		ProcessBuilder builder = new ProcessBuilder(command);
		builder.directory(new File("."));
		Process process = null;
		try {
			process = builder.start();
			final BufferedReader input = new BufferedReader(new InputStreamReader(process.getInputStream()));
			final BufferedReader error = new BufferedReader(new InputStreamReader(process.getErrorStream()));
			new Thread(new Runnable() {
				public void run() {
					String line;
					try {
						while ((line = input.readLine()) != null) {
						    System.out.println("ugligy: " + line);
						}
					} catch (IOException e) {
					}
				}
			}).start();
			new Thread(new Runnable() {
				public void run() {
					String line;
					try {
						while ((line = error.readLine()) != null) {
						    System.err.println("ugligy: " + line);
						}
					} catch (IOException e) {
					}
				}
			}).start();
			try {
				process.waitFor();
			} catch (InterruptedException e) {
			}
		} finally {
			if (process != null) {
				process.destroy();
			}
		}
		System.out.println("Done.");
	}
}
