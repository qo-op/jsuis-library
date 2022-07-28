package jsuis.util;

import java.awt.Image;
import java.io.IOException;
import java.net.URL;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
import java.util.MissingResourceException;
import java.util.ResourceBundle;

import javax.imageio.ImageIO;

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
			}
			if (resourceBundle == null) {
				try {
					resourceBundle = ResourceBundle.getBundle(name, Locale.US);
					resourceBundleMap.put(name, resourceBundle);
				} catch (MissingResourceException e) {
					System.out.println("Missing resource bundle: " + c.getName() + " for key: " + key);
				}
			}
		}
		if (resourceBundle != null) {
			try {
				return NVL.nvl(resourceBundle.getString(key), defaultValue);
			} catch (MissingResourceException e) {
				System.out.println("Missing resource: " + c.getName() + "/key: " + key);
			}
		}
		return defaultValue;
	}
	
	public static Image getImage(Class<?> c, String key) {
		Image image = getImage(c, key, null);
		if (image == null) {
			System.out.println("Missing resource: " + c.getPackage().getName() + "/" + key);
		}
		return image;
	}
	
	public static Image getImage(Class<?> c, String key, Image defaultImage) {
		String localizedKey;
		int index = key.lastIndexOf(".");
		if (index == -1) {
			localizedKey = key + "_" + Locale.getDefault();
		} else {
			localizedKey = key.substring(0, index) + "_" + Locale.getDefault() + key.substring(index);
		}
		Map<Class<?>, Map<String, Image>> imageMaps = getImageMaps();
		Map<String, Image> imageMap = imageMaps.get(c);
		if (imageMap == null) {
			imageMap = new HashMap<>();
			imageMaps.put(c, imageMap);
		}
		Image image = imageMap.get(localizedKey);
		if (image != null) {
			return image;
		}
		URL url = c.getResource(localizedKey);
		if (url != null) {
			try {
				image = ImageIO.read(url);
				imageMap.put(localizedKey, image);
				return image;
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		image = imageMap.get(key);
		if (image != null) {
			return image;
		}
		url = c.getResource(key);
		if (url != null) {
			try {
				image = ImageIO.read(url);
				imageMap.put(key, image);
				return image;
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return defaultImage;
	}
	
	private static Map<Class<?>, Map<String, Image>> imageMaps;
	
	public static Map<Class<?>, Map<String, Image>> getImageMaps() {
		if (imageMaps == null) {
			imageMaps = new HashMap<>();
		}
		return imageMaps;
	}
}
