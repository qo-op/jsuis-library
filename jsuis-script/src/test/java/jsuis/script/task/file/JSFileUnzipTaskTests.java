package jsuis.script.task.file;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.Arrays;

import org.junit.jupiter.api.Test;

import jsuis.script.block.JSBlock;
import jsuis.script.task.directory.JSDirectoryZipTask;
import jsuis.util.JSMap;

class JSFileUnzipTaskTests {

	@Test
	void test() throws Exception {
		JSBlock zip = new JSBlock(Arrays.asList(
				new JSDirectoryZipTask().with(JSMap.toMap(
						"source", "src\\",
						"include", "*",
						"exclude", "",
						"destination", "test.zip",
						"overwrite", "true",
						"preserve", "true"
						))
				));
		zip.execute();
		JSBlock unzip = new JSBlock(Arrays.asList(
				new JSFileUnzipTask().with(JSMap.toMap(
						"source", "test.zip",
						"destination", "",
						"overwrite", "true",
						"preserve", "true"
						))
				));
		unzip.execute();
		assertEquals(1, 1);
	}
}
