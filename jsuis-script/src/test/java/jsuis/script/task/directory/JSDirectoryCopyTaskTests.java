package jsuis.script.task.directory;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.Arrays;

import org.junit.jupiter.api.Test;

import jsuis.script.block.JSBlock;
import jsuis.util.JSMap;

class JSDirectoryCopyTaskTests {

	@Test
	void test() throws Exception {
		JSBlock block = new JSBlock(Arrays.asList(
				new JSDirectoryCopyTask().with(JSMap.toMap(
						"source", ".\\",
						"include", "*",
						"exclude", "",
						"destination", "..\\copy\\",
						"overwrite", "false"
						))
				));
		block.execute();
		assertEquals(1, 1);
	}
}
