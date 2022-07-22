package jsuis.script.task.general;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;
import java.util.Arrays;

import org.junit.jupiter.api.Test;

import jsuis.script.block.JSBlock;
import jsuis.util.JSMap;

public class JSLengthTaskTests {

	@Test
	public void test() throws Exception {
		JSBlock block = new JSBlock(Arrays.asList(
				new JSLetTask().with(JSMap.toMap(
						"variable", "length", "type", "Integer")), // let length = null;
				new JSLetTask().with(JSMap.toMap(
						"variable", "x", "type", "List", "listValue", new ArrayList<>())), // let x = (List) [];
				new JSAddTask().with(JSMap.toMap(
						"list", "x", "type", "Integer", "value", "1")), // x.add((Integer) 1);
				new JSAddTask().with(JSMap.toMap(
						"list", "x", "type", "Integer", "value", "2")), // x.add((Integer) 2);
				new JSAddTask().with(JSMap.toMap(
						"list", "x", "type", "Integer", "value", "3")), // x.add((Integer) 3);
				new JSLengthTask().with(JSMap.toMap(
						"variable", "length", "object", "x")))); // length = x.size();
		block.execute();
		assertEquals(3L, block.get("length"));
	}
}
