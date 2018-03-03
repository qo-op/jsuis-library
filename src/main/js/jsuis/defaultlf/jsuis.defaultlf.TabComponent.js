/**
 * jsuis.defaultlf.TabComponent
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Button;
	jsuis.defaultlf.TabComponent = jsuis.Object.extend(SUPER, function(text, icon) {
		SUPER.prototype.constructor.call(this, text, icon);
		this.setMargin(new jsuis.Insets(0, -3.5));
		this.setBorder(new jsuis.defaultlf.TabComponentBorder());
		this.setBackground(jsuis.Color.LightGray);
		this.setRolloverColor(jsuis.Color.LightGray);
		this.setPressedColor(jsuis.Color.Gray);
	});
	jsuis.defaultlf.TabComponent.prototype.setSelected = function(selected) {
		SUPER.prototype.setSelected.call(this, selected);
		var border = this.getBorder();
		border.paintBorder(this);
		return this;
	}
	/*
	jsuis.defaultlf.TabComponent.prototype.validate = function() {
		var selected = this.isSelected();
		if (selected) {
			this.paint();
		} else {
			this.paintPressed();
		}
		SUPER.prototype.validate.call(this);
	}
	*/
	jsuis.defaultlf.TabComponent.prototype.mouseClicked = function() {
	}
	jsuis.defaultlf.TabComponent.prototype.mousePressed = function() {
	}
	jsuis.defaultlf.TabComponent.prototype.mouseReleased = function() {
	}
	jsuis.defaultlf.TabComponent.prototype.mouseEntered = function() {
	}
	jsuis.defaultlf.TabComponent.prototype.mouseExited = function() {
	}
}) (jsuis);
