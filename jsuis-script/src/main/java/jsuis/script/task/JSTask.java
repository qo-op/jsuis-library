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

	private JSBlock block;
	
	public JSBlock getBlock() {
		return block;
	}
	
	public void setBlock(JSBlock block) {
		this.block = block;
	}
	
	public abstract void execute() throws Exception;
	
	public abstract <T> T accept(JSTaskVisitor<T> visitor);
	
	public Object get(String key, Class<?> type) throws IOException, ScriptException {
		return parse(getParameterMap().get(key), type);
	}
	
	public Object parse(Object value, Class<?> type) throws IOException, ScriptException {
		return getBlock().parse(value, type);
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
		return (File) get(key, File.class);
	}
	
	public Integer getInteger(String key) throws IOException, ScriptException {
		return (Integer) get(key, Integer.class);
	}
	
	public Object getObject(String key) throws IOException, ScriptException {
		return get(key, Object.class);
	}
	
	public List<Object> getList(String key, Class<?> elementType) throws IOException, ScriptException {
		List<Object> objectList = new ArrayList<>();
		List<?> list = (List<?>) get(key, List.class);
		if (list != null && !list.isEmpty()) {
			Object[] objects = ((List<?>) get(key, List.class)).toArray();
			for (Object object : objects) {
				objectList.add(parse(object, elementType));
			}
		}
		return objectList;
	}
	
	public Map<String, Object> getMap(String key, Class<?> entryType, String entryKey, String entryValue) throws IOException, ScriptException {
		Map<String, Object> map = new LinkedHashMap<>();
		List<Map<String, Object>> table = getTable(key);
		if (table != null) {
			int size = table.size();
			for (int i = 0; i < size; i++) {
				Map<String, Object> rowMap = table.get(i);
				map.put((String) rowMap.get(entryKey), parse(rowMap.get(entryValue), entryType));
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
				if (column < columnTypes.length) {
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
