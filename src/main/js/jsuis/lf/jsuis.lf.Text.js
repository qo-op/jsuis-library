/**
 * jsuis.lf.Text
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Component;
	jsuis.lf.Text = jsuis.Object.extend(SUPER, function(text) {
		SUPER.prototype.constructor.call(this, document.createElementNS(jsuis.Constants.SVG, "text"));
		SUPER.prototype.setEnabled.call(this, false);
		this.setText(nvl(text, ""));
		this.setFont(new jsuis.Font("Arial", "bold", 12));
		this.setForeground(jsuis.Color.Black);
		this.setDisabledColor(jsuis.Color.Gray);
		this.setSelectable(false);
	});
	jsuis.Object.addProperties(jsuis.lf.Text, {
		text: null,
		color: null,
		disabledColor: null
	});
	jsuis.lf.Text.prototype.getText = function() {
		var element = this.getElement();
		return element.textContent;
	}
	jsuis.lf.Text.prototype.setText = function(text) {
		var element = this.getElement();
		element.textContent = text;
		return this;
	}
	jsuis.lf.Text.prototype.setWidth = function(width) {
		this.width = width;
		return this;
	}
	jsuis.lf.Text.prototype.setHeight = function(height) {
		this.height = height;
		return this;
	}
	jsuis.lf.Text.prototype.getBackground = function() {
		SUPER.prototype.getForeground.call(this);
	}
	jsuis.lf.Text.prototype.setBackground = function(background) {
		SUPER.prototype.setForeground.call(this, background);
		return this;
	}
	jsuis.lf.Text.prototype.getForeground = function() {
		SUPER.prototype.getBackground.call(this);
	}
	jsuis.lf.Text.prototype.setForeground = function(foreground) {
		this.setColor(foreground);
		SUPER.prototype.setBackground.call(this, foreground);
		return this;
	}
	jsuis.lf.Text.prototype.setEnabled = function(enabled) {
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
	jsuis.lf.Text.prototype.validate = function() {
		var element = this.getElement();
		var bbox = element.getBBox();
		var dy = this.getY() - bbox.y;
		this.setAttribute("transform", "translate(" + 0 + "," + dy + ")");
		SUPER.prototype.validate.call(this);
	}
}) (jsuis);
