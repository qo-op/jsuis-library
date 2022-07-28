package jsuis.script.task.general;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.Arrays;

import org.junit.jupiter.api.Test;

import jsuis.script.block.JSBlock;
import jsuis.util.JSMap;

public class JSLetTaskTests {

	@Test
	public void declareIntegerTest() throws Exception {
		JSBlock block = new JSBlock(Arrays.asList(
				new JSLetTask().with(JSMap.toMap(
						"variable", "x", "type", "Integer", "value", "1")))); // let x = (Integer) 1;
		block.execute();
		assertEquals(1, block.get("x"));
	}

	@Test
	public void declareListTest() throws Exception {
		JSBlock block = new JSBlock(Arrays.asList(
				new JSLetTask().with(JSMap.toMap(
						"variable", "x", "type", "IntegerList", "listValue", Arrays.asList(
								"1",
								"2",
								"3"
								))))); // let x = [ (Integer) 1, (Integer) 2, (Integer) 3 ];
		block.execute();
		assertEquals(Arrays.asList(1, 2, 3), block.get("x"));
	}
}
