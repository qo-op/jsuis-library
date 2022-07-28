package jsuis.util;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.io.IOException;

import org.junit.jupiter.api.Test;

class JSONTests {

	@Test
	void parseTest() throws IOException {
		String actual = JSON.parse("\"test\"", String.class);
		assertEquals("test", actual);
	}
	
	@Test
	void stringifyTest() throws IOException {
		String actual = (String) JSON.stringify("test");
		assertEquals("\"test\"", actual);
	}
}
