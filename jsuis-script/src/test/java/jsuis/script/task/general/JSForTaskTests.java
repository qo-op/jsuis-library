package jsuis.script.task.general;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.Arrays;

import org.junit.jupiter.api.Test;

import jsuis.script.block.JSBlock;
import jsuis.script.block.JSLoopBlock;
import jsuis.util.JSMap;

public class JSForTaskTests {

	@Test
	public void test() throws Exception {
		JSBlock block = new JSBlock(Arrays.asList(
				new JSDeclareTask(JSMap.toMap(
						"variable", "sum", "type", "Integer", "value", "0")), // let sum = (Integer) 0;
				new JSForTask(JSMap.toMap(
						"counter", "i", "start", "1", "end", "10")).setLoopBlock(new JSLoopBlock(Arrays.asList( // for (i = 1; i <= 10; i++) {
						new JSSetTask(JSMap.toMap(
								"variable", "sum", "type", "Integer", "value", "sum + i")) // sum = (Integer) (sum + i);
						))), // }
				new JSLogTask(JSMap.toMap(
						"text", "${sum}")))); // System.out.println(sum);
		block.execute();
		assertEquals(55, block.get("sum"));
	}
}
