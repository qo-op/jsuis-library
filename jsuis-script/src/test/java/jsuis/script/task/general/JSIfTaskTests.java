package jsuis.script.task.general;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.Arrays;

import org.junit.jupiter.api.Test;

import jsuis.script.block.JSBlock;
import jsuis.script.block.JSIfBlock;
import jsuis.script.task.JSConditionalTask;
import jsuis.util.JSMap;

class JSIfTaskTests {

	@Test
	void test() throws Exception {
		JSBlock block = new JSBlock(Arrays.asList(
				new JSLetTask().with(JSMap.toMap(
						"variable", "x", "type", "String", "value", "Hi, World!")), // let x = (String) "Hi, World!"
				((JSConditionalTask) new JSIfTask().with(JSMap.toMap("condition", "true"))).setIfBlock(new JSIfBlock(Arrays.asList(
						new JSSetTask().with(JSMap.toMap("variable", "x", "type", "String", "value", "Hello, World!"))))), // x = (String) "Hello, World!"
				new JSLogTask().with(JSMap.toMap("text", "${x}")))); // System.out.println("${x}");
		block.execute();
		assertEquals("Hello, World!", block.get("x"));
	}
}
