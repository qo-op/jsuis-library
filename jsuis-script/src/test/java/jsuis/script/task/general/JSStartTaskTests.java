package jsuis.script.task.general;

import java.util.Arrays;

import org.junit.jupiter.api.Test;

import jsuis.script.block.JSFunctionBlock;
import jsuis.script.block.JSWorkBlock;
import jsuis.util.JSMap;

public class JSStartTaskTests {

	@Test
	public void test() throws Exception {
		JSWorkBlock workBlock = new JSWorkBlock(Arrays.asList(
				new JSStartTask().setFunctionBlock(new JSFunctionBlock(Arrays.asList( // {
						new JSLogTask().with(JSMap.toMap(
								"text", "Hello, World!")) // System.out.println("Hello, World!");
						))) // }
				));
		workBlock.execute();
	}
}
