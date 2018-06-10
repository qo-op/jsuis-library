/**
 * jsuis.lf.Label
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Svg;
	jsuis.lf.Label = jsuis.Object.extend(SUPER, function(text, icon) {
		SUPER.prototype.constructor.call(this, null);
		this.setLayout(new jsuis.BorderLayout());
		this.setText(text);
		this.setIcon(icon);
		this.setIconTextGap(4);
	});
	jsuis.Object.addProperties(jsuis.lf.Label, {
		text: null,
		label: null,
		icon: null,
		iconGraphics: null,
		iconTextGap: 0
	});
	jsuis.lf.Label.prototype.getText = function() {
		var label = this.getLabel();
		if (label) {
			return label.getText();
		}
		return "";
	}
	jsuis.lf.Label.prototype.setText = function(text, textConstraints) {
		if (text) {
			var label = this.getLabel();
			if (!label) {
				label = new jsuis.lf.Text();
				this.setLabel(label);
				this.add(label, nvl(textConstraints, jsuis.Constraints.CENTER.withFill(jsuis.Constants.NONE)));
			} else if (textConstraints) {
				label.setConstraints(textConstraints);
			}
			label.setText(text);
		}
		this.validate();
		this.paint();
		return this;
	}
	jsuis.lf.Label.prototype.setIcon = function(icon, constraints) {
		if (icon) {
			var iconGraphics = this.getIconGraphics();
			if (!iconGraphics) {
				iconGraphics = new jsuis.lf.G();
				iconGraphics.setGraphics(iconGraphics);
				this.setIconGraphics(iconGraphics);
				this.add(iconGraphics, nvl(constraints, jsuis.Constraints.WEST.withFill(jsuis.Constants.NONE)));
				iconGraphics.setPreferredSize(new jsuis.Dimension(icon.getIconWidth(), icon.getIconHeight()));
				iconGraphics.setEnabled(false);
			}
			icon.paintIcon(iconGraphics);
		}
		this.icon = icon;
		return this;
	}
	jsuis.lf.Label.prototype.setIconTextGap = function(iconTextGap) {
		var layout = this.getLayout();
		layout.setHgap(iconTextGap).setVgap(iconTextGap);
		this.iconTextGap = iconTextGap;
		return this;
	}
	jsuis.lf.Label.prototype.setForeground = function(foreground) {
		var label = this.getLabel();
		if (label) {
			label.setForeground(foreground);
		}
		this.foreground = foreground;
		return this;
	}
	jsuis.lf.Label.prototype.setFont = function(font) {
		var label = this.getLabel();
		if (label) {
			label.setFont(font);
		}
		this.font = font;
		return this;
	}
	jsuis.lf.Label.prototype.setEnabled = function(enabled) {
		var label = this.getLabel();
		if (label) {
			label.setEnabled(enabled);
		}
		SUPER.prototype.setEnabled.call(this, enabled);
		return this;
	}
}) (jsuis);
