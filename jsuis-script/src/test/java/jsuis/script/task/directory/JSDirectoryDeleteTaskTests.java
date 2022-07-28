package jsuis.script.task.directory;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.Arrays;

import org.junit.jupiter.api.Test;

import jsuis.script.block.JSBlock;
import jsuis.util.JSMap;

class JSDirectoryDeleteTaskTests {

	@Test
	void test() throws Exception {
		JSBlock block = new JSBlock(Arrays.asList(
				new JSDirectoryDeleteTask().with(JSMap.toMap(
						"directory", "target",
						"include", "sha1/**",
						"exclude", ""
						))
				));
		block.execute();
		assertEquals(1, 1);
	}
}
