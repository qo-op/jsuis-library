package jsuis.script.task.general;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

import jsuis.script.executor.JSEval;

public class JSEvalTests {

	@Test
	public void test() throws Exception {
		JSEval eval = new JSEval();
		eval.script(
				"var text = new String('Hello, World!');\r\n"
				+ "var textSlice = new task.JSTextSlice();\r\n"
				+ "textSlice.setText(text);\r\n"
				+ "textSlice.setStart(1);\r\n"
				+ "textSlice.setEnd(5);\r\n"
				+ "textSlice.execute();\r\n"
				+ "textSlice.getResult();\r\n"
		);
		Object result = eval.execute();
		assertEquals("ello", result);
	}
}
