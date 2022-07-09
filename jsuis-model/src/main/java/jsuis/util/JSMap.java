package jsuis.util;

import java.util.LinkedHashMap;

public class JSMap<K, V> extends LinkedHashMap<K, V> {

	private static final long serialVersionUID = 1L;

	public static JSMap<String, Object> toMap(Object... pairs) {
		JSMap<String, Object> map = new JSMap<>();
		int length = pairs.length;
		for (int i = 0; i < length - 1; i += 2) {
			map.put(pairs[i].toString(), pairs[i + 1]);
		}
		return map;
	}
}
