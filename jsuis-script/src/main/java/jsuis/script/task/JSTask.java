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

import jsuis.file.JSFile;
import jsuis.script.JSScriptComponentUtils;
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
		init();
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
	
	public JSTask with(Map<String, Object> parameterMap) {
		setParameterMap(parameterMap);
		return this;
	}
	
	private Map<String, Object> parameterMap;
	
	public Map<String, Object> getParameterMap() {
		return parameterMap;
	}

	public void setParameterMap(Map<String, Object> parameterMap) {
		if (this.parameterMap == null) {
			this.parameterMap = parameterMap;
		} else {
			this.parameterMap.putAll(parameterMap);
		}
	}
	
	public abstract void execute() throws Exception;
	
	public abstract <T> T accept(JSTaskVisitor<T> visitor);
	
	public void set(String key, Object value) {
		getParameterMap().put(key, value);
	}
	
	public Object get(String key, Class<?> type) throws IOException, ScriptException {
		return parse(get(key), type);
	}
	
	public Object get(String key) {
		return getParameterMap().get(key);
	}
	
	public Object parse(Object value, Class<?> type) throws IOException, ScriptException {
		return getBlock().parse(value, type);
	}
	
	public Class<?> getType(String name) {
		return nvl(JSScriptTypeUtils.getType(name), Object.class);
	}
	
	public Class<?> getComponent(String name) {
		return JSScriptComponentUtils.getComponent(name);
	}
	
	public <T> T nvl(T value, T defaultValue) {
		return NVL.nvl(value, defaultValue);
	}
	
	private JSBlock block;
	
	public JSBlock getBlock() {
		return block;
	}
	
	public void setBlock(JSBlock block) {
		this.block = block;
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
	
	public Date getDate(String key) throws IOException, ScriptException {
		return (Date) get(key, Date.class);
	}
	
	public BigDecimal getDecimal(String key) throws IOException, ScriptException {
		return (BigDecimal) get(key, BigDecimal.class);
	}
	
	public Double getDouble(String key) throws IOException, ScriptException {
		return (Double) get(key, Double.class);
	}
	
	public File getFile(String key) throws IOException, ScriptException {
		File file = (File) get(key, File.class);
		if (file == null) {
			return null;
		}
		return new JSFile(file);
	}
	
	public Integer getInteger(String key) throws IOException, ScriptException {
		return (Integer) get(key, Integer.class);
	}
	
	public Object getObject(String key) throws IOException, ScriptException {
		return get(key, Object.class);
	}
	
	public List<Object> getList(String key) throws IOException, ScriptException {
		List<Object> list = new ArrayList<>();
		List<?> l = (List<?>) get(key, List.class);
		if (l != null && !l.isEmpty()) {
			Object[] elements = ((List<?>) get(key, List.class)).toArray();
			for (Object element : elements) {
				list.add(element);
			}
		}
		return list;
	}
	
	@SuppressWarnings("unchecked")
	public <T> List<T> getList(String key, Class<T> elementType) throws IOException, ScriptException {
		List<T> list = new ArrayList<>();
		List<?> l = (List<?>) get(key, List.class);
		if (l != null && !l.isEmpty()) {
			Object[] elements = ((List<?>) get(key, List.class)).toArray();
			for (Object element : elements) {
				if (elementType != Object.class) {
					
				}
				list.add((T) parse(element, elementType));
			}
		}
		return list;
	}
	
	public Map<String, Object> getMap(String key) throws IOException, ScriptException {
		Map<String, Object> map = new LinkedHashMap<>();
		Map<?, ?> m = (Map<?, ?>) get(key, Map.class);
		if (m != null && !m.isEmpty()) {
			Object[] entryKeys = m.keySet().toArray();
			for (Object entryKey : entryKeys) {
				map.put((String) entryKey, m.get(entryKey));
			}
		}
		return map;
	}
	
	@SuppressWarnings("unchecked")
	public <T> Map<String, T> getMap(String key, Class<T> entryType) throws IOException, ScriptException {
		Map<String, T> map = new LinkedHashMap<>();
		Map<?, ?> m = (Map<?, ?>) get(key, Map.class);
		if (m != null && !m.isEmpty()) {
			Object[] entryKeys = m.keySet().toArray();
			for (Object entryKey : entryKeys) {
				map.put((String) entryKey, (T) parse(m.get(entryKey), entryType));
			}
		}
		return map;
	}
	
	public List<Map<String, Object>> getTable(String key, Class<?>... columnTypes) throws IOException, ScriptException {
		List<?> list = (List<?>) get(key, List.class);
		if (list == null || list.isEmpty()) {
			return null;
		}
		List<Map<String, Object>> table = new ArrayList<>();
		String[] headers = ((List<?>) list.get(0)).toArray(new String[0]);
		int size = list.size();
		for (int row = 1; row < size; row++) {
			Object[] cells = ((List<?>) list.get(row)).toArray();
			Map<String, Object> map = new LinkedHashMap<String, Object>();
			for (int column = 0; column < cells.length; column++) {
				if (column < columnTypes.length && columnTypes[column] != Void.class) {
					map.put(headers[column], parse(cells[column], columnTypes[column]));
				} else {
					map.put(headers[column], cells[column]);
				}
			}
			table.add(map);
		}
		return table;
	}
}
