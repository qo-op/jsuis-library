package jsuis.tool;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;

/**
 * Build
 */
public class Build {
	
	public static void sort(List<File> files) throws IOException {
		Pattern pattern = Pattern.compile("\\s*var\\s+SUPER\\s*=\\s*(.*?)\\s*;\\s*");
		Map<String, String> parents = new HashMap<String, String>();
		for (File file : files) {
			BufferedReader bufferedReader = null;
			try {
				bufferedReader = new BufferedReader(new InputStreamReader(new FileInputStream(file), "ISO-8859-1"));
				String line = null;
				while ((line = bufferedReader.readLine()) != null) {
					Matcher matcher = pattern.matcher(line);
					if (matcher.matches()) {
						String parent = matcher.group(1);
						String object = file.getName().replaceAll("\\.js$", "");
						parents.put(object, parent);
						break;
					}
				}
			} finally {
				if (bufferedReader != null) {
					bufferedReader.close();
				}
			}
		}
		final Map<File, Integer> priorities = new HashMap<File, Integer>();
		for (File file : files) {
			
			String object = file.getName().replaceAll("\\.js$", "");
			List<String> ancestors = new ArrayList<String>();
			String parent = null;
			while ((parent = parents.get(object)) != null) {
				ancestors.add(parent);
				object = parent;
			}
			int priority = ancestors.size();
			priorities.put(file, priority);
		}
		Collections.sort(files, new Comparator<File>() {
			public int compare(File source, File otherSource) {
				int priority = priorities.get(source);
				int otherPriority = priorities.get(otherSource);
				if (priority < otherPriority) {
					return -1;
				}
				if (priority > otherPriority) {
					return 1;
				}
				return source.compareTo(otherSource);
			}
		});
	}
	
    public static void join(File destination, List<File> files) throws IOException {
    	BufferedWriter bufferedWriter = null;
    	try {
			bufferedWriter = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(destination, true), "ISO-8859-1"));
            for (File file : files) {
    			BufferedReader bufferedReader = null;
    			try {
    				bufferedReader = new BufferedReader(new InputStreamReader(new FileInputStream(file), "ISO-8859-1"));
    				IOUtils.copy(bufferedReader, bufferedWriter);
					bufferedWriter.write("\n");
    			} finally {
    				if (bufferedReader != null) {
						bufferedReader.close();
    				}
    			}
            }
		} finally {
			if (bufferedWriter != null) {
				bufferedWriter.close();
			}
		}
    }
    
	public static void replace(List<File> htmlFiles, String regex, String replacement, String from, String to) throws IOException {
		for (File file : htmlFiles) {
			File destination = new File(file.getAbsolutePath().replaceAll(from, to));
			if (!destination.exists()) {
				destination.getParentFile().mkdirs();
				destination.createNewFile();
			}
	    	BufferedWriter bufferedWriter = null;
	    	try {
				bufferedWriter = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(destination), "UTF-8"));
				BufferedReader bufferedReader = null;
				try {
					bufferedReader = new BufferedReader(new InputStreamReader(new FileInputStream(file), "UTF-8"));
					String line = null;
					while ((line = bufferedReader.readLine()) != null) {
						line = line.replaceAll(regex, replacement);
						bufferedWriter.write(line + "\n");
					}
				} finally {
					if (bufferedReader != null) {
						bufferedReader.close();
					}
				}
			} finally {
				if (bufferedWriter != null) {
					bufferedWriter.close();
				}
			}
		}
	}
    
	public static void main(String[] args) throws IOException {
		
		/*
		 * output
		 */
		System.out.println("Output folder...");
		File output = new File("src/main/webapp");
		
		/*
		 * jsuis.js
		 */
		File jsuis = new File(output, "jsuis.js");
		System.out.println("Cleaning jsuis.js...");
		FileUtils.writeStringToFile(jsuis, "", "ISO-8859-1");
		System.out.println("Getting jsuis files...");
		List<File> jsuisFiles = new ArrayList<File>();
		jsuisFiles.addAll(FileUtils.listFiles(new File("src/main/js/jsuis"), new String[] { "js" }, false));
		System.out.println("Sorting jsuis files...");
		Build.sort(jsuisFiles);
		System.out.println("Adding jsuis files to jsuis.js...");
		Build.join(jsuis, jsuisFiles);
		
		System.out.println("Getting jsuis-defaultlf files...");
		List<File> jsuisDefaultlfFiles = new ArrayList<File>();
		jsuisDefaultlfFiles.addAll(FileUtils.listFiles(new File("src/main/js/jsuis/defaultlf"), new String[] { "js" }, false));
		System.out.println("Sorting jsuis-defaultlf files...");
		Build.sort(jsuisDefaultlfFiles);
		System.out.println("Adding jsuis-defaultlf files to jsuis.js...");
		Build.join(jsuis, jsuisDefaultlfFiles);
		
		/*
		 * versions/jsuis-version.js
		 */
		String version = FileUtils.readFileToString(new File("version.txt"), "ISO-8859-1");
		File jsuisVersion = new File("versions/jsuis-" + version + ".js");
		FileUtils.copyFile(jsuis, jsuisVersion);
		
		/*
		 * .html
		 */
		System.out.println("Getting html files...");
		List<File> htmlFiles = new ArrayList<File>();
		htmlFiles.addAll(FileUtils.listFiles(new File("src/main/html"), new String[] { "html" }, true));
		System.out.println("Replacing html files...");
		String date = new SimpleDateFormat("yyyyMMddHHmmss").format(new Date());
		Build.replace(htmlFiles, "\\$\\{date\\}", date, "src[\\\\\\/]main[\\\\\\/]html", "src/main/webapp");
		
		/*
		 * done
		 */
		System.out.println("Done.");
	}
}
