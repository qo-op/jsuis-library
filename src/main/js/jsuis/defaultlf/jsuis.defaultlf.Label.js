/**
 * jsuis.defaultlf.Label
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Panel;
	jsuis.defaultlf.Label = jsuis.Object.extend(SUPER, function(text, icon) {
		SUPER.prototype.constructor.call(this, null);
		this.setLayout(new jsuis.BorderLayout());
		this.setText(text);
		this.setIcon(icon);
		this.setIconTextGap(4);
	});
	jsuis.Object.addProperties(jsuis.defaultlf.Label, {
		text: null,
		icon: null,
		iconTextGap: 0,
		label: null,
	});
	jsuis.defaultlf.Label.prototype.getText = function() {
		var label = this.getLabel();
		if (label) {
			return label.getText();
		}
		return "";
	}
	jsuis.defaultlf.Label.prototype.setText = function(text, textConstraints) {
		if (text) {
			var label = this.getLabel();
			if (!label) {
				label = new jsuis.defaultlf.Text();
				this.setLabel(label);
				this.add(label, nvl(textConstraints, jsuis.Constraints.CENTER.withFill(jsuis.Constants.NONE)));
			} else if (textConstraints) {
				label.setConstraints(textConstraints);
			}
			label.setText(text);
		}
		return this;
	}
	jsuis.defaultlf.Label.prototype.setIcon = function(icon, constraints) {
		if (icon) {
			var image = this.getImage();
			if (!image) {
				image = new jsuis.defaultlf.Image();
				this.setImage(image);
				this.add(image, nvl(constraints, jsuis.Constraints.WEST.withFill(jsuis.Constants.NONE)));
				image.setEnabled(false);
			}
			icon.paintIcon(this);
		}
		this.icon = icon;
		return this;
	}
	jsuis.defaultlf.Label.prototype.setIconTextGap = function(iconTextGap) {
		var layout = this.getLayout();
		layout.setHgap(iconTextGap).setVgap(iconTextGap);
		this.iconTextGap = iconTextGap;
		return this;
	}
	jsuis.defaultlf.Label.prototype.setForeground = function(foreground) {
		var label = this.getLabel();
		if (label) {
			label.setForeground(foreground);
		}
		this.foreground = foreground;
		return this;
	}
	jsuis.defaultlf.Label.prototype.setFont = function(font) {
		var label = this.getLabel();
		if (label) {
			label.setFont(font);
		}
		this.font = font;
		return this;
	}
	jsuis.defaultlf.Label.prototype.setEnabled = function(enabled) {
		var label = this.getLabel();
		if (label) {
			label.setEnabled(enabled);
		}
		SUPER.prototype.setEnabled.call(this, enabled);
		return this;
	}
}) (jsuis);
