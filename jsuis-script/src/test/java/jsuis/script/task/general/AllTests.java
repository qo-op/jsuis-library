package jsuis.script.task.general;

import org.junit.platform.suite.api.SelectClasses;
import org.junit.platform.suite.api.Suite;

@Suite
@SelectClasses({
	JSCallTaskTests.class,
	JSLetTaskTests.class,
	JSForTaskTests.class,
	JSGetTaskTests.class,
	JSIfTaskTests.class,
	JSLengthTaskTests.class,
	JSLogTaskTests.class,
	JSSetTaskTests.class,
	JSStartTaskTests.class,
	})
public class AllTests {
}
