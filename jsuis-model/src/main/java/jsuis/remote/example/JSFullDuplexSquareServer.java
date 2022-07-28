package jsuis.remote.example;

import jsuis.remote.JSFullDuplex;

/**
 * Full duplex square server example
 * 
 * @author Yassuo Toda
 */
public class JSFullDuplexSquareServer extends JSFullDuplex {

	public JSFullDuplexSquareServer() {
		super(System.in, System.out);
	}

	@Override
	public String respond(String request) {
		int number = Integer.parseInt(request);
		return "" + number * number;
	}
	
	public static void main(String[] args) {
		
		JSFullDuplexSquareServer server = new JSFullDuplexSquareServer();
		
		if (args.length == 0) {
			
			server.NUL = "<NUL>";
			server.SOH = "<SOH>";
			server.STX = "<STX>";
			server.ETX = "<ETX>";
			server.EOT = "<EOT>";
			
			System.out.println("Please type the following commands in the Console:");
			System.out.println();
			System.out.println("<NUL><SOH><NUL>1<NUL>1<NUL><STX><NUL>3<NUL><ETX><NUL><EOT><NUL>");
			System.out.println("<NUL><SOH><NUL>1<NUL>1<NUL><STX><NUL><ETX><NUL><ETX><NUL><EOT><NUL>");
			System.out.println();
			System.out.println("<NUL><SOH><NUL>1<NUL>1<NUL><STX><NUL><NUL><ETX><NUL><EOT><NUL>");
			System.out.println("<NUL><SOH><NUL>1<NUL>1<NUL><STX><NUL><ETX><NUL><ETX><NUL><EOT><NUL>");
			System.out.println();
		}
		
		server.listen();
	}
}
