/**
 * null value
 */
function nvl(value, defaultValue) {
	if ((value === null) || (value === undefined)) {
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
jsuis = {
};

/**
 * jsuis.packages
 */
jsuis.packages = [];
