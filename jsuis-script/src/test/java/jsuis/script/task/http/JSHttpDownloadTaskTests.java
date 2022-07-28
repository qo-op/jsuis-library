package jsuis.script.task.http;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.io.File;
import java.util.Arrays;

import org.junit.jupiter.api.Test;

import jsuis.script.block.JSBlock;
import jsuis.util.JSMap;

class JSHttpDownloadTaskTests {

	@Test
	void test() throws Exception {
		JSBlock block = new JSBlock(Arrays.asList(
				new JSHttpDownloadTask().with(JSMap.toMap(
						"variable", "file",
						"url", "https://repo.maven.apache.org/maven2/org/apache/commons/commons-lang3/3.12.0/commons-lang3-3.12.0.jar",
						"file", "~/Downloads/commons-lang3-3.12.0.jar"))
				));
		block.execute();
		assertEquals(true, new File(System.getProperty("user.home"), "Downloads/commons-lang3-3.12.0.jar").exists());
	}
}
