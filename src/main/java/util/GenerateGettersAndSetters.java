package util;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class GenerateGettersAndSetters {

	public static final File file = new File("src/main/ts", "jsuis/JSScrollPane.ts");
	public static final boolean setter = true;
	
	public static final Pattern pattern = Pattern.compile(".*\\s+private\\s+([^:]*):([^;]*).*");
	
	public static void main(String[] args) throws Exception {
		
		System.out.println(file.getCanonicalPath());
		
		FileReader fileReader = new FileReader(file);
		BufferedReader bufferedReader = new BufferedReader(fileReader);
		
		try {
			List<String> variableList = new ArrayList<String>();
			Map<String, String> variableMap = new HashMap<String, String>();
			
			String line;
			while ((line = bufferedReader.readLine()) != null) {
				Matcher matcher = pattern.matcher(line);
				if (matcher.matches()) {
					String v = matcher.group(1).trim();
					variableList.add(v);
					String c = matcher.group(2).trim();
					variableMap.put(v, c);
				}
			}
			
			Collections.sort(variableList, new Comparator<String>() {
				@Override
				public int compare(String s1, String s2) {
					return s1.compareTo(s2);
				}
			});
			for (String v : variableList) {
				String c = variableMap.get(v);
				if (!v.equals(c.replaceAll("^JS", "").substring(0, 1).toLowerCase() + c.replaceAll("^JS", "").substring(1))) {
					System.err.println("Variable instanceof '" + c + "' has an usual name '" + v + "'");
				}
				System.out.println("private " + v + ": " + c + ";");
			}
			for (String v : variableList) {
				String c = variableMap.get(v);
				System.out.println(
						"get" + v.substring(0, 1).toUpperCase() + v.substring(1) +
						"(): " + c + " {");
				System.out.println("\treturn this." + v + ";");
				System.out.println("}");
				if (setter) {
					System.out.println(
							"set" + v.substring(0, 1).toUpperCase() + v.substring(1) +
							"(" + v + ": " + c + ") {");
					System.out.println("\tthis." + v + " = " + v + ";");
					System.out.println("}");
				}
			}
		} finally {
			bufferedReader.close();
		}
	}
}
