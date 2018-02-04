/**
 * jsuis
 */
jsuis = {
};
/**
 * SVG
 */
jsuis.SVG = "http://www.w3.org/2000/svg";
/**
 * null value
 */
function nvl(value, defaultValue) {
	if ((value === null) || (value === undefined)) {
		return defaultValue;
	}
	return value;
}
