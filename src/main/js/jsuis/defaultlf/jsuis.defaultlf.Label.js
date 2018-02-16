/**
 * jsuis.defaultlf.Label
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Component;
	jsuis.defaultlf.Label = jsuis.Object.extend(SUPER, function(text) {
		SUPER.prototype.constructor.call(this, document.createElementNS(jsuis.Constants.SVG, "text"));
		SUPER.prototype.setEnabled.call(this, false);
		this.setText(nvl(text, ""));
		this.setFont(new jsuis.Font("Arial", "bold", 12));
		this.setForeground(jsuis.Color.Black);
		this.setDisabledColor(jsuis.Color.Gray);
		this.setSelectable(false);
	});
	jsuis.Object.addProperties(jsuis.defaultlf.Label,
			new jsuis.Property("color"),
			new jsuis.Property("disabledColor")
	);
	jsuis.defaultlf.Label.prototype.getText = function() {
		var element = this.getElement();
		return element.textContent;
	}
	jsuis.defaultlf.Label.prototype.setText = function(text) {
		var element = this.getElement();
		element.textContent = text;
		return this;
	}
	jsuis.defaultlf.Label.prototype.setWidth = function(width) {
		this.width = width;
		return this;
	}
	jsuis.defaultlf.Label.prototype.setHeight = function(height) {
		this.height = height;
		return this;
	}
	jsuis.defaultlf.Label.prototype.getBackground = function() {
		SUPER.prototype.getForeground.call(this);
	}
	jsuis.defaultlf.Label.prototype.setBackground = function(background) {
		SUPER.prototype.setForeground.call(this, background);
		return this;
	}
	jsuis.defaultlf.Label.prototype.getForeground = function() {
		SUPER.prototype.getBackground.call(this);
	}
	jsuis.defaultlf.Label.prototype.setForeground = function(foreground) {
		this.setColor(foreground);
		SUPER.prototype.setBackground.call(this, foreground);
		return this;
	}
	jsuis.defaultlf.Label.prototype.setEnabled = function(enabled) {
		if (enabled) {
			var color = this.getColor();
			SUPER.prototype.setBackground.call(this, color);
		} else {
			var disabledColor = this.getDisabledColor();
			SUPER.prototype.setBackground.call(this, disabledColor);
		}
		var oldEnabled = this.isEnabled();
		this.enabled = enabled;
		this.firePropertyChange("enabled", oldEnabled, enabled);
		return this;
	}
	jsuis.defaultlf.Label.prototype.validate = function() {
		var element = this.getElement();
		var outsets = this.getOutsets();
		this.setAttribute("transform", "translate(" + 0 + ","
				+ (this.getY() + outsets.getTop() - element.getBBox().y) + ")");
		SUPER.prototype.validate.call(this);
	}
}) (jsuis);
