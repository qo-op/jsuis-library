/**
 * jsuis.defaultLf.Label
 */
(function(jsuis) {
	var SUPER = jsuis.Component;
	jsuis.defaultLf.Label = jsuis.Object.extend(SUPER, function(text) {
		SUPER.prototype.constructor.call(this, document.createElementNS(jsuis.Constants.SVG, "text"));
		SUPER.prototype.setEnabled.call(this, false);
		this.setText(nvl(text, ""));
		this.setFont(new jsuis.Font("Arial", "bold", 12));
		this.setForeground(jsuis.Color.Black);
		this.setDisabledColor(jsuis.Color.Gray);
		this.setSelectable(false);
	});
	jsuis.Object.addProperties(jsuis.defaultLf.Label,
			new jsuis.Property("color"),
			new jsuis.Property("disabledColor")
	);
	jsuis.defaultLf.Label.prototype.getText = function() {
		var element = this.getElement();
		return element.textContent;
	}
	jsuis.defaultLf.Label.prototype.setText = function(text) {
		var element = this.getElement();
		element.textContent = text;
		return this;
	}
	jsuis.defaultLf.Label.prototype.getWidth = function() {
		return this.getPreferredSize().getWidth();
	}
	jsuis.defaultLf.Label.prototype.setWidth = function(width) {
		return this;
	}
	jsuis.defaultLf.Label.prototype.getHeight = function() {
		return this.getPreferredSize().getHeight();
	}
	jsuis.defaultLf.Label.prototype.setHeight = function(height) {
		return this;
	}
	jsuis.defaultLf.Label.prototype.getBackground = function() {
		SUPER.prototype.getForeground.call(this);
	}
	jsuis.defaultLf.Label.prototype.setBackground = function(background) {
		SUPER.prototype.setForeground.call(this, background);
		return this;
	}
	jsuis.defaultLf.Label.prototype.getForeground = function() {
		SUPER.prototype.getBackground.call(this);
	}
	jsuis.defaultLf.Label.prototype.setForeground = function(foreground) {
		this.setColor(foreground);
		SUPER.prototype.setBackground.call(this, foreground);
		return this;
	}
	jsuis.defaultLf.Label.prototype.getEnabled = function() {
		return this.enabled;
	}
	jsuis.defaultLf.Label.prototype.setEnabled = function(enabled) {
		if (enabled) {
			var color = this.getColor();
			SUPER.prototype.setBackground.call(this, color);
		} else {
			var disabledColor = this.getDisabledColor();
			SUPER.prototype.setBackground.call(this, disabledColor);
		}
		this.enabled = enabled;
		return this;
	}
	jsuis.defaultLf.Label.prototype.validate = function() {
		var element = this.getElement();
		this.setAttribute("transform", "translate(" + 0 + "," + (this.getY() - element.getBBox().y) + ")");
		SUPER.prototype.validate.call(this);
	}
}) (jsuis);
