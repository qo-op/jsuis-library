package jsuis.script.task.general;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.Arrays;

import org.junit.jupiter.api.Test;

import jsuis.script.block.JSBlock;
import jsuis.script.block.JSLoopBlock;
import jsuis.script.task.JSLoopTask;
import jsuis.util.JSMap;

public class JSForEachTaskTests {

	@Test
	public void test() throws Exception {
		JSBlock block = new JSBlock(Arrays.asList(
				new JSDeclareTask().with(JSMap.toMap(
						"variable", "sum", "type", "Integer", "value", "0")), // let sum = (Integer) 0;
				new JSDeclareTask().with(JSMap.toMap(
						"variable", "x", "type", "List", "listValue", Arrays.asList(
								Arrays.asList("elementType", "elementValue"),
								Arrays.asList("Integer"    , "10"),
								Arrays.asList("Integer"    , "20"),
								Arrays.asList("Integer"    , "50")
								))), // let x = [ (Integer) 10, (Integer) 20, (Integer) 50 ];
				((JSLoopTask) new JSForEachTask().with(JSMap.toMap(
						"variable", "i", "iterable", "x"))).setLoopBlock(new JSLoopBlock(Arrays.asList( // for (let i of x) {
						new JSSetTask().with(JSMap.toMap(
								"variable", "sum", "type", "Integer", "value", "sum + i")) // sum = (Integer) (sum + i);
						))), // }
				new JSLogTask().with(JSMap.toMap(
						"text", "${sum}")))); // System.out.println(sum);
		block.execute();
		assertEquals(80, block.get("sum"));
	}
}
