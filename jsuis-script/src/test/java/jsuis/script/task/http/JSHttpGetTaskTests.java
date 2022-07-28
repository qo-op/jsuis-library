package jsuis.script.task.http;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

import jsuis.script.executor.JSHttpGet;

class JSHttpGetTaskTests {

	@Test
	void testExecutor() throws Exception {

		JSHttpGet httpGet = new JSHttpGet();
		httpGet.url("https://www.google.com");
		httpGet.timeout(5000);
		assertEquals(true, ((String) httpGet.execute()).contains("Google"));
	}
}
