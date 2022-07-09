package jsuis.script.task.general;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.Arrays;

import org.junit.jupiter.api.Test;

import jsuis.script.block.JSBlock;
import jsuis.util.JSMap;

public class JSLogTaskTests {

	@Test
	public void test() throws Exception {
		JSBlock block = new JSBlock(Arrays.asList(
				new JSDeclareTask(JSMap.toMap(
						"variable", "x", "type", "Text", "value", "Hello, World!")), // let x = (String) "Hello, World!"
				new JSLogTask(JSMap.toMap(
						"text", "${x}")))); // System.out.println("${x}");
		block.execute();
		assertEquals("Hello, World!", block.get("x"));
	}
}
