package jsuis.script.task;

import java.io.File;
import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.script.ScriptException;

import jsuis.script.JSScriptParameterAnnotationUtils;
import jsuis.script.JSScriptTypeUtils;
import jsuis.script.annotation.JSParameter;
import jsuis.script.block.JSBlock;
import jsuis.script.visitor.JSTaskVisitor;
import jsuis.util.NVL;

/**
 * Task
 * 
 * @author Yassuo Toda
 */
public abstract class JSTask {
	
	public JSTask() {
		this(null);
	}
	
	public JSTask(Map<String, Object> valueMap) {
		init();
		putAll(valueMap);
	}

	public void init() {
		try {
			List<JSParameter> parameterAnnotationList = getParameterAnnotationList();
			JSParameter[] parameterAnnotations = JSScriptParameterAnnotationUtils.populate(this);
			for (JSParameter parameterAnnotation : parameterAnnotations) {
				parameterAnnotationList.add(parameterAnnotation);
			}
		} catch (IllegalAccessException | IllegalArgumentException | InvocationTargetException e) {
			e.printStackTrace();
		}
	}
	
	private List<JSParameter> parameterAnnotationList = new ArrayList<>();

	public List<JSParameter> getParameterAnnotationList() {
		return parameterAnnotationList;
	}
	
	public void putAll(Map<String, Object> valueMap) {
		if (valueMap == null) {
			return;
		}
		getValueMap().putAll(valueMap);
	}
	
	private Map<String, Object> valueMap;
	
	public Map<String, Object> getValueMap() {
		return valueMap;
	}

	public void setValueMap(Map<String, Object> valueMap) {
		this.valueMap = valueMap;
	}

	private JSBlock block;
	
	public JSBlock getBlock() {
		return block;
	}
	
	public void setBlock(JSBlock block) {
		this.block = block;
	}
	
	public abstract void execute() throws Exception;
	
	public abstract <T> T accept(JSTaskVisitor<T> visitor);
	
	public Object get(String key, Class<?> type, String... formats) throws IOException, ScriptException {
		return parse(getValueMap().get(key), type, formats);
	}
	
	public Object parse(Object value, Class<?> type, String... formats) throws IOException, ScriptException {
		return getBlock().parse(value, type, formats);
	}
	
	public Class<?> getType(String name) {
		return nvl(JSScriptTypeUtils.getType(name), Object.class);
	}
	
	public <T> T nvl(T value, T defaultValue) {
		return NVL.nvl(value, defaultValue);
	}
	
	/*
	 * getters...
	 */
	
	public String getString(String key) throws IOException, ScriptException {
		return (String) get(key, String.class);
	}
	
	public Boolean getBoolean(String key) throws IOException, ScriptException {
		return (Boolean) get(key, Boolean.class);
	}
	
	public Date getDate(String key, String format) throws IOException, ScriptException {
		return (Date) get(key, Date.class);
	}
	
	public BigDecimal getDecimal(String key, String format) throws IOException, ScriptException {
		return (BigDecimal) get(key, BigDecimal.class);
	}
	
	public Double getDouble(String key) throws IOException, ScriptException {
		return (Double) get(key, Double.class);
	}
	
	public File getFile(String key) throws IOException, ScriptException {
		return (File) get(key, File.class);
	}
	
	public Integer getInteger(String key) throws IOException, ScriptException {
		return (Integer) get(key, Integer.class);
	}
	
	@SuppressWarnings("unchecked")
	public List<Object> getList(String key) throws IOException, ScriptException {
		return (List<Object>) get(key, List.class);
	}
	
	@SuppressWarnings("unchecked")
	public Map<String, Object> getMap(String key) throws IOException, ScriptException {
		return (Map<String, Object>) get(key, Map.class);
	}
	
	public Object getObject(String key) throws IOException, ScriptException {
		return get(key, Object.class);
	}
	
	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> getTable(String key) throws IOException, ScriptException {
		List<Object> list = getList(key);
		if (list == null || list.isEmpty()) {
			return null;
		}
		int size = list.size();
		List<Map<String, Object>> table = new ArrayList<>();
		List<String> header = (List<String>) list.get(0);
		for (int row = 1; row < size; row++) {
			List<Object> rowData = (List<Object>) list.get(row);
			Map<String, Object> map = new LinkedHashMap<String, Object>();
			int columnCount = rowData.size();
			for (int column = 0; column < columnCount; column++) {
				map.put(header.get(column), rowData.get(column));
			}
			table.add(map);
		}
		return table;
	}
}
