package jsuis.util;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

class JSONTests {

	@Test
	void testParse() {
		String actual = (String) JSON.parse("\"test\"");
		assertEquals("test", actual);
	}
	
	@Test
	void testStringify() {
		String actual = (String) JSON.stringify("test");
		assertEquals("\"test\"", actual);
	}
}
