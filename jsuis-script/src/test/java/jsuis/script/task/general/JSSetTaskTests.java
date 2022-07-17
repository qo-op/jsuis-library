package jsuis.script.task.general;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.Arrays;

import org.junit.jupiter.api.Test;

import jsuis.script.block.JSBlock;
import jsuis.util.JSMap;

public class JSSetTaskTests {

	@Test
	public void test() throws Exception {
		JSBlock block = new JSBlock(Arrays.asList(
				new JSDeclareTask().with(JSMap.toMap(
						"variable", "x", "type", "Integer", "value", "2")), // let x = (Integer) 2;
				new JSDeclareTask().with(JSMap.toMap(
						"variable", "y", "type", "Integer", "value", "3")), // let y = (Integer) 3;
				new JSSetTask().with(JSMap.toMap(
						"variable", "x", "type", "Integer", "value", "x + y")) // x = (Integer) (x + y);
				));
		block.execute();
		assertEquals(5, block.get("x"));
	}
}
