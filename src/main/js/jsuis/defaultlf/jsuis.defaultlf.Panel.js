/**
 * jsuis.defaultlf.Panel
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Component;
	jsuis.defaultlf.Panel = jsuis.Object.extend(SUPER, function(layout) {
		SUPER.prototype.constructor.call(this, document.createElementNS(jsuis.Constants.SVG, "g"));
		this.setLayout(layout !== undefined ? layout : new jsuis.FlowLayout());
		this.setTarget(new jsuis.defaultlf.Rect());
		this.setBackground(null);
	});
	jsuis.defaultlf.Panel.prototype.getTarget = function() {
		return this.target;
	}
	jsuis.defaultlf.Panel.prototype.setTarget = function(target) {
		var oldTarget = this.getTarget();
		if (oldTarget) {
			this.removeChild(oldTarget);
		}
		if (target) {
			this.addChild(target);
		}
		this.target = target;
		return this;
	}
	jsuis.defaultlf.Panel.prototype.setX = function(x) {
		this.setAttribute("transform", "translate(" + nvl(x, 0) + "," + this.getY() + ")");
		var target = this.getTarget();
		var outsets = this.getOutsets();
		target.setX(outsets.getLeft());
		this.x = x;
		return this;
	}
	jsuis.defaultlf.Panel.prototype.setY = function(y) {
		this.setAttribute("transform", "translate(" + this.getX() + "," + nvl(y, 0) + ")");
		var target = this.getTarget();
		var outsets = this.getOutsets();
		target.setY(outsets.getTop());
		this.y = y;
		return this;
	}
	jsuis.defaultlf.Panel.prototype.getWidth = function() {
		var target = this.getTarget();
		var outsets = this.getOutsets();
		return target.getWidth() + outsets.getLeft() + outsets.getRight();
	}
	jsuis.defaultlf.Panel.prototype.setWidth = function(width) {
		var target = this.getTarget();
		var outsets = this.getOutsets();
		target.setWidth(width - outsets.getLeft() - outsets.getRight());
		return this;
	}
	jsuis.defaultlf.Panel.prototype.getHeight = function() {
		var target = this.getTarget();
		var outsets = this.getOutsets();
		return target.getHeight() + outsets.getTop() + outsets.getBottom();
	}
	jsuis.defaultlf.Panel.prototype.setHeight = function(height) {
		var target = this.getTarget();
		var outsets = this.getOutsets();
		target.setHeight(height - outsets.getTop() - outsets.getBottom());
		return this;
	}
	jsuis.defaultlf.Panel.prototype.setVisible = function(visible) {
		var target = this.getTarget();
		target.setVisible(visible);
		SUPER.prototype.setVisible.call(this, visible);
		return this;
	}
	jsuis.defaultlf.Panel.prototype.getBackground = function() {
		var target = this.getTarget();
		return target.getBackground();
	}
	jsuis.defaultlf.Panel.prototype.setBackground = function(background) {
		var target = this.getTarget();
		target.setBackground(background);
		return this;
	}
}) (jsuis);
