package jsuis.util;

import java.net.URL;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
import java.util.MissingResourceException;
import java.util.ResourceBundle;

import javax.swing.Icon;
import javax.swing.ImageIcon;

/**
 * Internationalization
 * 
 * @author Yassuo Toda
 */
public class JSI18n {

	private static Map<String, ResourceBundle> resourceBundleMap = new HashMap<String, ResourceBundle>();
	
	public static String getText(Class<?> c, String key) {
		return getText(c, key, key);
	}
	
	public static String getText(Class<?> c, String key, String defaultValue) {
		String name = c.getName();
		ResourceBundle resourceBundle = resourceBundleMap.get(name);
		if (resourceBundle == null) {
			try {
				resourceBundle = ResourceBundle.getBundle(name, Locale.getDefault());
				resourceBundleMap.put(name, resourceBundle);
			} catch (MissingResourceException e) {
				System.err.println(e.getLocalizedMessage());
			}
		}
		if (resourceBundle != null) {
			try {
				String string = resourceBundle.getString(key);
				return string != null ? string : defaultValue;
			} catch (MissingResourceException e) {
				System.err.println(name + "/" + e.getLocalizedMessage());
			}
		}
		return defaultValue;
	}
	
	public static Icon getIcon(Class<?> c, String key) {
		Icon icon = getIcon(c, key, null);
		if (icon == null) {
			System.err.println("Missing resource: " + c.getPackage().getName() + "/" + key);
		}
		return icon;
	}
	
	public static Icon getIcon(Class<?> c, String key, Icon defaultIcon) {
		String localizedKey;
		int index = key.lastIndexOf(".");
		if (index == -1) {
			localizedKey = key + "_" + Locale.getDefault();
		} else {
			localizedKey = key.substring(0, index) + "_" + Locale.getDefault() + key.substring(index);
		}
		Map<Class<?>, Map<String, Icon>> iconMaps = getIconMaps();
		Map<String, Icon> iconMap = iconMaps.get(c);
		if (iconMap == null) {
			iconMap = new HashMap<String, Icon>();
		}
		Icon icon = iconMap.get(localizedKey);
		if (icon != null) {
			return icon;
		}
		URL url = c.getResource(localizedKey);
		if (url != null) {
			icon = new ImageIcon(url);
			iconMap.put(localizedKey, icon);
			return icon;
		}
		icon = iconMap.get(key);
		if (icon != null) {
			return icon;
		}
		url = c.getResource(key);
		if (url != null) {
			icon = new ImageIcon(url);
			iconMap.put(key, icon);
			return icon;
		}
		return defaultIcon;
	}
	
	private static Map<Class<?>, Map<String, Icon>> iconMaps;
	
	public static Map<Class<?>, Map<String, Icon>> getIconMaps() {
		if (iconMaps == null) {
			iconMaps = new HashMap<Class<?>, Map<String, Icon>>();
		}
		return iconMaps;
	}
}
