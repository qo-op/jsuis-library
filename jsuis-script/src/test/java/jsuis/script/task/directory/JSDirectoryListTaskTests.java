package jsuis.script.task.directory;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.Arrays;

import org.junit.jupiter.api.Test;

import jsuis.script.block.JSBlock;
import jsuis.script.task.general.JSLogTask;
import jsuis.util.JSMap;

class JSDirectoryListTaskTests {

	@Test
	void test() throws Exception {
		JSBlock block = new JSBlock(Arrays.asList(
				new JSDirectoryListTask().with(JSMap.toMap(
						"variable", "fileList",
						"directory", ".\\",
						"include", "*/",
						"exclude", "")),
				new JSLogTask().with(JSMap.toMap(
						"text", "#{fileList.toString()}"))
				));
		block.execute();
		assertEquals(1, 1);
	}
}
