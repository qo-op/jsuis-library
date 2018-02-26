/**
 * jsuis.defaultlf.Icon
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.defaultlf.Icon = jsuis.Object.extend(SUPER, function(iconWidth, iconHeight) {
		SUPER.prototype.constructor.call(this);
		this.setIconWidth(iconWidth);
		this.setIconHeight(iconHeight);
	});
	jsuis.Object.addProperties(jsuis.defaultlf.Icon, {
		iconWidth: 0,
		iconHeight: 0,
		style: null,
		background: null,
		foreground: null,
	});
	jsuis.defaultlf.Icon.prototype.setStyleProperty = function(property, value) {
		var style = this.getStyle();
		if (!style) {
			style = {};
			this.setStyle(style);
		}
		style[property] = value;
		return this;
	}
	jsuis.defaultlf.Icon.prototype.getStyleProperty = function(property) {
		var style = this.getStyle();
		if (!style) {
			style = {};
			this.setStyle(style);
		}
		return style[property];
	}
	jsuis.defaultlf.Icon.prototype.setBackground = function(background) {
		this.setStyleProperty("fill", nvl(background, "none").toString());
		this.background = background;
		return this;
	}
	jsuis.defaultlf.Icon.prototype.setForeground = function(foreground) {
		this.setStyleProperty("stroke", nvl(foreground, "none").toString());
		this.foreground = foreground;
		return this;
	}
}) (jsuis);
