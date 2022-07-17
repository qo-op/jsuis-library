package jsuis.script.task.text;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.Arrays;

import org.junit.jupiter.api.Test;

import jsuis.script.block.JSBlock;
import jsuis.script.task.general.JSLogTask;
import jsuis.util.JSMap;

class JSTextSliceTaskTests {

	@Test
	void test() throws Exception {
		JSBlock block = new JSBlock(Arrays.asList(
				new JSTextSliceTask().with(JSMap.toMap(
						"variable", "text",
						"text", "Hello, World!",
						"start", "-6",
						"end", "-1"
						)),
				new JSLogTask().with(JSMap.toMap(
						"text", "${text}")))); // System.out.println("${text}");
		block.execute();
		assertEquals("World", block.get("text"));
	}
}
