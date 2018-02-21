/**
 * jsuis.defaultlf.TabComponent
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Button;
	jsuis.defaultlf.TabComponent = jsuis.Object.extend(SUPER, function(text, icon) {
		SUPER.prototype.constructor.call(this, text, icon);
		var target = new jsuis.defaultlf.Path("M 0 0");
		this.setTarget(target);
		this.setBorder(new jsuis.defaultlf.LineBorder(jsuis.Color.Black.withAlpha(.4 * 255)));
	});
	jsuis.defaultlf.TabComponent.prototype.setSelected = function(selected) {
		SUPER.prototype.setSelected.call(this, selected);
		this.validate();
		return this;
	}
	jsuis.defaultlf.TabComponent.prototype.validate = function() {
		var w = this.getWidth();
		var h = this.getHeight();
		var target = this.getTarget();
		var selected = this.isSelected();
		var d = "M 0 " + h + " l 2 -" + h + " l " + (w - 4) + " 0 l 2 " + h;
		target.setAttribute("d", d);
		if (selected) {
			this.paint();
		} else {
			this.paintPressed();
		}
		SUPER.prototype.validate.call(this);
	}
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
