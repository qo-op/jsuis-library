package jsuis.script.variable.visitor;

import static org.junit.jupiter.api.Assertions.assertEquals;

import javax.script.Bindings;
import javax.script.ScriptException;
import javax.script.SimpleBindings;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class JSVariablePrinterTests {

	private static Bindings bindings;
	private static JSVariableTranslator variableTranslator;
	
	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		bindings = new SimpleBindings();
		variableTranslator = new JSVariableTranslator(bindings);
	}

	@BeforeEach
	void setUp() throws Exception {
		bindings.clear();
	}
	
	@Test
	void dollarExpressionTest() throws ScriptException {
		bindings.put("greeting", "Hello");
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
		bindings.put("condition", false);
		Object actual = variableTranslator.translate("#{condition}");
		assertEquals(false, actual);
	}
}
