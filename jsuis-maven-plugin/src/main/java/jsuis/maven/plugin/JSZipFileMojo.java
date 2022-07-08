package jsuis.maven.plugin;

import java.io.File;
import java.io.IOException;

import org.apache.maven.plugin.MojoExecutionException;
import org.apache.maven.plugin.MojoFailureException;
import org.apache.maven.plugins.annotations.Mojo;
import org.apache.maven.plugins.annotations.Parameter;

import jsuis.io.JSFileUtils;

/**
 * Zip file mojo
 * 
 * @author Yassuo Toda
 */
@Mojo(name = "zipFile")
public class JSZipFileMojo extends JSMojo {

	@Parameter(property = "file", defaultValue = "${jsuis.maven.plugin.zipFile.file}")
	private String filePath;
	
	@Parameter(property = "zip", defaultValue = "${jsuis.maven.plugin.zipFile.zip}")
	private String zipPath;
	
	@Override
	public void execute() throws MojoExecutionException, MojoFailureException {
		filePath = translate(filePath);
		zipPath = translate(zipPath);
		File file = translate(new File(filePath));
		File zip = translate(new File(zipPath));
		getLog().info("map: " + getMap());
		getLog().info("file: " + file);
		getLog().info("zip: " + zip);
		try {
			getLog().info(String.format("Zipping file: '%s' to zip: '%s' ...", file, zip));
			JSFileUtils.zipFile(file, zip);
		} catch (IOException e) {
			throw new MojoExecutionException("An exception occurred while trying to zip file.", e);
		}
	}
}
