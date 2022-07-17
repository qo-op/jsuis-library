package jsuis.script.task.general;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.Arrays;

import org.junit.jupiter.api.Test;

import jsuis.script.block.JSBlock;
import jsuis.util.JSMap;

public class JSProcessTaskTests {

	@Test
	public void test() throws Exception {
		JSBlock block = new JSBlock(Arrays.asList(
				new JSProcessTask().with(JSMap.toMap(
						"variable", "text", "command", Arrays.asList(
								"cmd", "/c", "echo %JAVA_HOME%"), "variables", JSMap.toMap(
										"JAVA_HOME", "D:\\Java\\jdk1.8.0_60"))), // var text = process("cmd /c echo %JAVA_HOME%")
				new JSLogTask().with(JSMap.toMap(
						"text", "${text}")))); // System.out.println("${text}");
		block.execute();
		assertEquals("D:\\Java\\jdk1.8.0_60", ((String) block.get("text")).trim());
	}
}
