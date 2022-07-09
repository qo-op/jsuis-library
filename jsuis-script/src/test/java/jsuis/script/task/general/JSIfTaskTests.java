package jsuis.script.task.general;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.Arrays;

import org.junit.jupiter.api.Test;

import jsuis.script.block.JSBlock;
import jsuis.script.block.JSIfBlock;
import jsuis.util.JSMap;

class JSIfTaskTests {

	@Test
	void test() throws Exception {
		JSBlock block = new JSBlock(Arrays.asList(
				new JSDeclareTask(JSMap.toMap(
						"variable", "x", "type", "Text", "value", "Hi, World!")), // let x = (String) "Hi, World!"
				new JSIfTask(JSMap.toMap("condition", "true")).setIfBlock(new JSIfBlock(Arrays.asList(
						new JSSetTask(JSMap.toMap("variable", "x", "type", "Text", "value", "Hello, World!"))))), // x = (String) "Hello, World!"
				new JSLogTask(JSMap.toMap("text", "${x}")))); // System.out.println("${x}");
		block.execute();
		assertEquals("Hello, World!", block.get("x"));
	}
}
