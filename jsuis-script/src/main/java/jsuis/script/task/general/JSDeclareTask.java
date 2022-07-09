package jsuis.script.task.general;

import java.util.Map;

import jsuis.script.annotation.JSParameter;
import jsuis.script.block.JSBlock;
import jsuis.script.visitor.JSTaskVisitor;

/**
 * Declare task
 * 
 * let variable = (type) value;
 * 
 * @author Yassuo Toda
 */
public class JSDeclareTask extends JSAbstractSetTask {

	public JSDeclareTask() {
	}
	
	public JSDeclareTask(Map<String, Object> valueMap) {
		super(valueMap);
	}
	
	@JSParameter(name = "name", value = "declare")
	@JSParameter(name = "variable", value = "x")
	private Map<String, Object> valueMap;
	
	@Override
	public void execute() throws Exception {
		
		String variable = getString("variable");
		Object value = getValue();
		
		JSBlock block = getBlock();
		block.let(variable, value);
	}

	@Override
	public <T> T accept(JSTaskVisitor<T> visitor) {
		return visitor.visitDeclareTask(this);
	}
}
