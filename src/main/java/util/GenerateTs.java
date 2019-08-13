package util;

import java.io.File;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.io.FileUtils;

public class GenerateTs {

	public static final Pattern PATTERN = Pattern.compile("[\\s\\S]*?\\s+class\\s+([^\\{\\s]*)\\s+extends\\s+([^\\{\\s]*)[\\s\\S]*");
	
	public static void main(String[] args) throws Exception {
		
		System.out.println(new File(".").getCanonicalPath());
		
		List<File> fileList;
		Map<String, String> fileMap;
		Map<File, Integer> hierarchy;
		
		fileList = getFileList(new File[] { new File("src/main/ts/jsuis") });
		System.out.println(fileList);
		
		fileMap = getFileMap(fileList);
		System.out.println(fileMap);
		
		hierarchy = getHierarchy(fileList, fileMap);
		System.out.println(hierarchy);
		
		Collections.sort(fileList, new Comparator<File>() {
			@Override
			public int compare(File f1, File f2) {
				int h1 = hierarchy.get(f1);
				int h2 = hierarchy.get(f2);
				if (h1 < h2) return -1;
				if (h1 > h2) return 1;
				return f1.compareTo(f2);
			}
		});
		System.out.println(fileList);
		
		String ts = "";
		for (File file : fileList) {
			// System.out.println(file.getAbsolutePath().replace(new File("src/main/ts").getAbsolutePath(), ""));
			ts += "/// <reference path = \"" +
					file.getAbsolutePath()
						.replace(new File("src/main/ts").getAbsolutePath(), "")
						.replace("\\", "/")
						.replaceAll("^/", "")
					+ "\"/>\n";
		}
		System.out.println(ts.replaceAll("\\n", ", "));
		
		FileUtils.writeStringToFile(new File("src/main/ts/jsuis.ts"), ts, "ISO-8859-1");
	}
	
	static List<File> getFileList(File[] files) {
		List<File> fileList = new ArrayList<File>();
		for (File file: files) {
			fileList.addAll(FileUtils.listFiles(file, new String[] { "ts" }, true));
		}
		return fileList;
	}
	
	static Map<String, String> getFileMap(List<File> fileList) throws Exception {
		Map<String, String> fileMap = new HashMap<String, String>();
		for (File file : fileList) {
			String string = FileUtils.readFileToString(file, "ISO-8859-1");
			Matcher matcher = PATTERN.matcher(string);
			if (matcher.matches()) {
				String thisClass = matcher.group(1);
				if (!thisClass.equals(file.getName().replaceAll("\\.ts$", ""))) {
					throw new Exception("File name '" + file.getName() + "' doesn't match the class name '" + thisClass + "'");
				}
				String superClass = matcher.group(2);
				fileMap.put(thisClass, superClass);
			}
		}
		return fileMap;
	}
	
	static Map<File, Integer> getHierarchy(List<File> fileList, Map<String, String> fileMap) {
		Map<File, Integer> hierarchy = new HashMap<File, Integer>();
		for (File file : fileList) {
			String thisClass = file.getName().replaceAll("\\.ts$", "");
			String superClass = fileMap.get(thisClass);
			int i = 0;
			for (; superClass != null; i++) {
				superClass = fileMap.get(superClass);
			}
			hierarchy.put(file, i);
		}
		return hierarchy;
	}
}
