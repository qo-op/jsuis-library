/**
 * jsuis.Font
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.Font = jsuis.Object.extend(SUPER, function(name, style, size) {
		SUPER.prototype.constructor.call(this);
		this.setName(name);
		this.setStyle(style);
		this.setSize(size);
	});
	jsuis.Object.addProperties(jsuis.Font, {
		name: null,
		style: null,
		size: 0
	});
	
	jsuis.Font.NORMAL = "normal";
	jsuis.Font.ITALIC = "italic";
	jsuis.Font.OBLIQUE = "oblique";
	
}) (jsuis);
