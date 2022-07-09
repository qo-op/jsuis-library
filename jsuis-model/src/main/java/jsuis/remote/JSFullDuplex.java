package jsuis.remote;

import java.io.InputStream;
import java.io.PrintStream;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.Arrays;
import java.util.Map;
import java.util.Scanner;
import java.util.concurrent.ConcurrentHashMap;

import jsuis.lang.JSBreakException;

/**
 * Full duplex
 * 
 * @author Yassuo Toda
 */
public abstract class JSFullDuplex {

	private InputStream inputStream;
	private PrintStream printStream;
	
	public JSFullDuplex(InputStream inputStream, PrintStream printStream) {
		this.inputStream = inputStream;
		this.printStream = printStream;
	}
	
	public String NUL = "\0";
	public String SOH = "\1"; // Start of Heading
	public String STX = "\2"; // Start of Text
	public String ETX = "\3"; // End of Text
	public String EOT = "\4"; // End of Transmission
	
	public void listen() {
		try (Scanner scanner = new Scanner(inputStream)) {
			while (scanner.hasNext()) {
				String packet = scanner.nextLine();
				if (!packet.startsWith(NUL + SOH + NUL) || !packet.endsWith(NUL + EOT + NUL)) {
					redirect(packet);
					continue;
				}
				String[] data = packet.split(NUL, -1);
				data = Arrays.copyOfRange(data, 2, 7);
				if (data.length != 5) {
					redirect(packet);
					continue;
				}
				if (!STX.equals(data[2]) || !ETX.equals(data[4])) {
					redirect(packet);
					continue;
				}
				if (!handle(data)) {
					redirect(packet);
				}
			}
		} catch (JSBreakException e) {
		}
	}
	
	public void redirect(String string) {
		if (printStream != System.out) {
			System.out.println("redirect: " + string);
		}
	}
	
	private String input;
	private String output;
	private String error;
	
	public boolean handle(String[] data) throws JSBreakException {
		String channel = data[0];
		if ("1".equals(channel)) {
			String id = data[1];
			String segment = data[3];
			if (ETX.equals(segment)) {
				if (input.isEmpty()) {
					throw new JSBreakException();
				}
				String request = input;
				new Thread(new Runnable() {
					public void run() {
						try {
							String response = respond(request);
							output(id, response);
						} catch (Exception | Error e) {
							error(id, e);
						}
					}
				}).start();
				input = null;
				return true;
			} else {
				if (input == null) {
					input = segment;
				} else {
					input += "\n" + segment;
				}
				return true;
			}
		} else if ("2".equals(channel)) {
			String id = data[1];
			String segment = data[3];
			if (ETX.equals(segment)) {
				notifyOutput(id, output);
				output = null;
				return true;
			} else {
				if (output == null) {
					output = segment;
				} else {
					output += "\n" + segment;
				}
				return true;
			}
		} else if ("3".equals(channel)) {
			String id = data[1];
			String segment = data[3];
			if (ETX.equals(segment)) {
				notifyError(id, error);
				error = null;
				return true;
			} else {
				if (error == null) {
					error = segment;
				} else {
					error += "\n" + segment;
				}
				return true;
			}
		}
		return false;
	}
	
	private int sequence = 0;
	
	public synchronized String request(String request) throws Exception, Error {
		String id = "" + ++sequence;
		String[] lines = request.split("\\r?\\n", -1);
		synchronized (printStream) {
			for (String line : lines) {
				printStream.println(packet(1, id, line));
			}
			printStream.println(packet(1, id, ETX));
			printStream.flush();
		}
		while (!outputMap.containsKey(id) && !errorMap.containsKey(id)) {
			wait();
		}
		String error = errorMap.get(id);
		if (error != null) {
			throw new Exception(error);
		}
		return outputMap.get(id);
	}
	
	private Map<String, String> outputMap = new ConcurrentHashMap<String, String>();
	
	private synchronized void notifyOutput(String id, String output) {
		outputMap.put(id, output);
		notifyAll();
	}
	
	private Map<String, String> errorMap = new ConcurrentHashMap<String, String>();
	
	private synchronized void notifyError(String id, String error) {
		errorMap.put(id, error);
		notifyAll();
	}
	
	public abstract String respond(String request);
	
	public synchronized void output(String id, String output) {
		String[] lines = output.split("\\r?\\n", -1);
		synchronized (printStream) {
			for (String line : lines) {
				printStream.println(packet(2, id, line));
			}
			printStream.println(packet(2, id, ETX));
			printStream.flush();
		}
	}
	
	public synchronized void error(String id, Throwable error) {
        StringWriter stringWriter = new StringWriter();
        PrintWriter printWriter = new PrintWriter(stringWriter, true);
        error.printStackTrace(printWriter);
		String[] lines = stringWriter.toString().split("\\r?\\n", -1);
		synchronized (printStream) {
			for (String line : lines) {
				printStream.println(packet(3, id, line));
			}
			printStream.println(packet(3, id, ETX));
			printStream.flush();
		}
	}
	
	public String packet(int channel, String id, String segment) {
		return NUL
				+ SOH + NUL
				+ channel + NUL
				+ id + NUL
				+ STX + NUL
				+ segment+ NUL
				+ ETX + NUL
				+ EOT + NUL;
	}
}
