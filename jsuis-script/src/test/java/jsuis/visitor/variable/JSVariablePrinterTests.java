package jsuis.visitor.variable;

import static org.junit.jupiter.api.Assertions.assertEquals;

import javax.script.ScriptException;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import jsuis.script.block.JSBlock;
import jsuis.script.variable.visitor.JSVariableTranslator;

class JSVariablePrinterTests {

	private static JSBlock block;
	private static JSVariableTranslator variableTranslator;
	
	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		block = new JSBlock();
		variableTranslator = new JSVariableTranslator(block);
	}

	@BeforeEach
	void setUp() throws Exception {
		block.clear();
	}
	
	@Test
	void dollarExpressionTest() throws ScriptException {
		block.put("greeting", "Hello");
		Object actual = variableTranslator.translate("${greeting}, World!");
		assertEquals("Hello, World!", actual);
	}

	@Test
	void hashExpressionTest() throws ScriptException {
		Object actual = variableTranslator.translate("2 + 3 = #{2 + 3}.");
		assertEquals("2 + 3 = 5.", actual);
	}
	
	@Test
	void booleanEvaluationTest() throws ScriptException {
		block.put("condition", "false");
		Object actual = variableTranslator.translate("#{condition}");
		assertEquals(false, actual);
	}
}
