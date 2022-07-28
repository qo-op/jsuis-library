package jsuis.script.task.text;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.Arrays;

import org.junit.jupiter.api.Test;

import jsuis.script.block.JSBlock;
import jsuis.script.task.general.JSLogTask;
import jsuis.util.JSMap;

class JSTextReplaceTaskTests {

	@Test
	void test() throws Exception {
		JSBlock block = new JSBlock(Arrays.asList(
				new JSTextReplaceTask().with(JSMap.toMap(
						"variable", "text",
						"text", "Hello, World!",
						"target", "\\QHello\\E",
						"replacement", "Hi",
						"regex", "true"
						)),
				new JSLogTask().with(JSMap.toMap(
						"text", "${text}")))); // System.out.println("${text}");
		block.execute();
		assertEquals("Hi, World!", block.get("text"));
	}
}
