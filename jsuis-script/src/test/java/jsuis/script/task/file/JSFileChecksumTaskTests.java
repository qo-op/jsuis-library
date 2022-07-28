package jsuis.script.task.file;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;

import org.apache.commons.codec.digest.DigestUtils;
import org.junit.jupiter.api.Test;

import jsuis.script.block.JSBlock;
import jsuis.script.task.general.JSLogTask;
import jsuis.util.JSMap;

class JSFileChecksumTaskTests {

	@Test
	void test() throws Exception {
		Path file = Paths.get(getClass().getResource("Hello, World!.txt").toURI());
		JSBlock block = new JSBlock(Arrays.asList(
				new JSFileChecksumTask().with(JSMap.toMap(
						"variable", "checksum",
						"file", file.toString(),
						"algorithm", "MD5"
						)),
				new JSLogTask().with(JSMap.toMap(
						"text", "${checksum}")))); // System.out.println("${checksum}");
		block.execute();
		assertEquals(DigestUtils.md5Hex("Hello, World!"), block.get("checksum"));
	}
}
