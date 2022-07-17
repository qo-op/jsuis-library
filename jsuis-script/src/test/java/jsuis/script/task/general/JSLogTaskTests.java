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
				new JSDeclareTask().with(JSMap.toMap(
						"variable", "x", "type", "String", "value", "Hello, World!")), // let x = (String) "Hello, World!"
				new JSLogTask().with(JSMap.toMap(
						"text", "${x}")))); // System.out.println("${x}");
		block.execute();
		assertEquals("Hello, World!", block.get("x"));
	}
}
