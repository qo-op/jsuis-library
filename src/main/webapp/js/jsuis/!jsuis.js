/**
 * jsuis
 */
jsuis = {
};

/**
 * jsuis.packages
 */
jsuis.packages = [];

/**
 * null value
 */
function nvl(value, defaultValue) {
	if ((value === null) || (value === undefined)) {
		return defaultValue;
	}
	return value;
}
