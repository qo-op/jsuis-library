function nvl(value, defaultValue) {
	if ((value === null) || (value === undefined)) {
		return defaultValue;
	}
	return value;
}
function uvl(value, defaultValue) {
	if (value === undefined) {
		return defaultValue;
	}
	return value;
}
function println(text) {
	console.log(text);
}

/**
 * jsuis
 */
jsuis = {};

/**
 * jsuis.packages
 */
jsuis.packages = {};
jsuis.packages["jsuis"] = jsuis;
