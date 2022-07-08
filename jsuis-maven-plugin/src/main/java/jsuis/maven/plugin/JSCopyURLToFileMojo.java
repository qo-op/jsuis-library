package jsuis.maven.plugin;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Calendar;

import org.apache.maven.plugin.MojoExecutionException;
import org.apache.maven.plugin.MojoFailureException;
import org.apache.maven.plugins.annotations.Mojo;
import org.apache.maven.plugins.annotations.Parameter;

import jsuis.io.JSFileUtils;

/**
 * Copy URL to file mojo
 * 
 * @author Yassuo Toda
 */
@Mojo(name = "copyURLToFile")
public class JSCopyURLToFileMojo extends JSMojo {

	@Parameter(property = "url", defaultValue = "${jsuis.maven.plugin.copyURLToFile.url}")
	private String urlString;
	
	@Parameter(property = "file", defaultValue = "${jsuis.maven.plugin.copyURLToFile.file}")
	private String filePath;
	
	@Parameter(property = "updatePolicy", defaultValue = "${jsuis.maven.plugin.copyURLToFile.updatePolicy}")
	private String updatePolicy;
	
	@Override
	public void execute() throws MojoExecutionException, MojoFailureException {
		urlString = translate(urlString);
		URL url = null;
		try {
			url = new URL(urlString);
		} catch (MalformedURLException e) {
			getLog().info(e);
			throw new MojoExecutionException("An exception occurred while trying to parse the url string.", e);
		}
		filePath = translate(filePath);
		File file = translate(new File(filePath));
		updatePolicy = translate(updatePolicy, "daily");
		getLog().info("map: " + getMap());
		getLog().info("url: " + url);
		getLog().info("file: " + file);
		getLog().info("updatePolicy: " + updatePolicy);
		if (url != null) {
			if (!file.exists() || "always".equals(updatePolicy)) {
				try {
					getLog().info(String.format("Copying (%s) url: '%s' to file: '%s' ...", updatePolicy, url, file));
					JSFileUtils.copyURLToFile(url, file);
				} catch (IOException e) {
					throw new MojoExecutionException("An exception occurred while trying to copy URL to file.", e);
				}
			} else if ("daily".equals(updatePolicy)) {
				long millis = file.lastModified();
				Calendar calendar = Calendar.getInstance();
				calendar.setTimeInMillis(millis);
				millis -= millis % 3_600_000;
				millis -= calendar.get(Calendar.HOUR_OF_DAY) * 3_600_000;
				if (System.currentTimeMillis() - millis > 86_400_000) {
					try {
						getLog().info(String.format("Copying (%s) url: '%s' to file: '%s' ...", updatePolicy, url, file));
						JSFileUtils.copyURLToFile(url, file);
					} catch (IOException e) {
						throw new MojoExecutionException("An exception occurred while trying to copy URL to file.", e);
					}
				}
			}
		}
	}
}
