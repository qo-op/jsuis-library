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
	
	public List<File> getFiles() {
		List<File> files = new ArrayList<File>();
		files.addAll(FileUtils.listFiles(new File("src/main/webapp/js/jsuis"), new String[] { "js" }, true));
		return files;
	}
	
	public void sort(List<File> files) throws IOException {
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
	
    public void join(File destination, List<File> files) throws IOException {
		FileUtils.writeStringToFile(destination, "", "ISO-8859-1");
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
    
	public List<File> getHtmlFiles() {
		List<File> files = new ArrayList<File>();
		files.addAll(FileUtils.listFiles(new File("src/main/webapp"), new String[] { "html" }, true));
		return files;
	}
	
	public void update(List<File> htmlFiles) throws IOException {
		String date = new SimpleDateFormat("yyyyMMddHHmmss").format(new Date());
		Pattern pattern = Pattern.compile("\\s*<script src=\"/jsuis\\b.*?\\.js\\b.*\"></script>\\s*");
		for (File file : htmlFiles) {
			File copy = new File(file.getAbsolutePath() + ".tmp");
			FileUtils.copyFile(file, copy);
	    	BufferedWriter bufferedWriter = null;
	    	try {
				bufferedWriter = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(file), "ISO-8859-1"));
				BufferedReader bufferedReader = null;
				try {
					bufferedReader = new BufferedReader(new InputStreamReader(new FileInputStream(copy), "ISO-8859-1"));
					String line = null;
					while ((line = bufferedReader.readLine()) != null) {
						Matcher matcher = pattern.matcher(line);
						if (matcher.matches()) {
							bufferedWriter.write("    <script src=\"/jsuis.js?" + date + "\"></script>\n");
						} else {
							bufferedWriter.write(line + "\n");
						}
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
	    	copy.delete();
		}
	}
    
	public static void main(String[] args) throws IOException {
		Build build = new Build();
		System.out.println("Getting jsuis files...");
		List<File> files = build.getFiles();
		System.out.println("Sorting jsuis files...");
		build.sort(files);
		files.add(0, new File("src/main/webapp/js/jsuis/!jsuis.js"));
		System.out.println("Building jsuis.js...");
		String version = FileUtils.readFileToString(new File("version.txt"), "ISO-8859-1");
		File jsuisVersion = new File("versions/jsuis-" + version + ".js");
		build.join(jsuisVersion, files);
		File jsuis = new File("src/main/webapp/jsuis.js");
		FileUtils.copyFile(jsuisVersion, jsuis);
		System.out.println("Getting html files...");
		List<File> htmlFiles = build.getHtmlFiles();
		System.out.println("Updating html files...");
		build.update(htmlFiles);
		System.out.println("Done.");
	}
}
