package jsuis.script.task.general;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.Arrays;

import org.junit.jupiter.api.Test;

import jsuis.script.block.JSBlock;
import jsuis.script.block.JSFunctionBlock;
import jsuis.util.JSMap;

public class JSCallTaskTests {

	@Test
	public void test() throws Exception {
		JSBlock block = new JSBlock(Arrays.asList(
				((JSAbstractFunctionTask) new JSFunctionTask().with(JSMap.toMap(
						"function", "f",
						"arguments", Arrays.asList(
								Arrays.asList("type"    , "name", "value"),
								Arrays.asList("Integer" , "x"   , "0")) // f(Integer x = 0)
						))).setFunctionBlock(new JSFunctionBlock(Arrays.asList( // {
								new JSReturnTask().with(JSMap.toMap(
										"type", "Integer", "value", "x + 1")) // return (Integer) x + 1;
								))), // }
				new JSDeclareTask().with(JSMap.toMap(
						"variable", "y",
						"type", "Integer",
						"value", "0")), // let y = (Integer) 0;
				new JSCallTask().with(JSMap.toMap(
						"variable", "y",
						"callee", "f",
						"arguments", Arrays.asList(
								Arrays.asList("argument", "value"),
								Arrays.asList("x"       , "1")))))); // y = f(x = 1);
		block.execute();
		assertEquals(2, block.get("y"));
	}
}
