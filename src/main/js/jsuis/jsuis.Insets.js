/**
 * Insets
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.Insets = jsuis.Object.extend(SUPER, function(top, left, bottom, right) {
		SUPER.prototype.constructor.call(this);
		top = nvl(top, 0);
		left = nvl(left, top);
		bottom = nvl(bottom, top);
		right = nvl(right, left);
		this.setTop(top);
		this.setLeft(left);
		this.setBottom(bottom);
		this.setRight(right);
	});
	jsuis.Object.addProperties(jsuis.Insets, {
		top: 0,
		left: 0,
		bottom: 0,
		right: 0
	});
	jsuis.Insets.prototype.getPoint = function() {
		return new jsuis.Point(this.getLeft(), this.getTop());
	}
	jsuis.Insets.prototype.getDimension = function() {
		return new jsuis.Dimension(this.getLeft() + this.getRight(), this.getTop() + this.getBottom());
	}
	jsuis.Insets.prototype.add = function(insets) {
		var top = this.getTop() + insets.getTop();
		var left = this.getLeft() + insets.getLeft();
		var bottom = this.getBottom() + insets.getBottom();
		var right = this.getRight() + insets.getRight();
		return new jsuis.Insets(top, left, bottom, right);
	}
	jsuis.Insets.prototype.subtract = function(insets) {
		var top = this.getTop() - insets.getTop();
		var left = this.getLeft() - insets.getLeft();
		var bottom = this.getBottom() - insets.getBottom();
		var right = this.getRight() - insets.getRight();
		return new jsuis.Insets(top, left, bottom, right);
	}
	jsuis.Insets.prototype.clone = function() {
		return new jsuis.Insets(this.getTop(), this.getLeft(), this.getBottom(), this.getRight());
	}
})(jsuis);
