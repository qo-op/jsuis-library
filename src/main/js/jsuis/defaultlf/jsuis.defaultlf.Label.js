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
		label: null,
		icon: null,
		iconPanel: null,
		iconTextGap: 0
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
		this.validate();
		this.paint();
		return this;
	}
	jsuis.defaultlf.Label.prototype.setIcon = function(icon, constraints) {
		if (icon) {
			var iconPanel = this.getIconPanel();
			if (!iconPanel) {
				iconPanel = new jsuis.defaultlf.Panel();
				this.setIconPanel(iconPanel);
				this.add(iconPanel, nvl(constraints, jsuis.Constraints.WEST.withFill(jsuis.Constants.NONE)));
				iconPanel.setPreferredSize(new jsuis.Dimension(icon.getIconWidth(), icon.getIconHeight()));
				iconPanel.setEnabled(false);
			}
			icon.paintIcon(iconPanel);
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
