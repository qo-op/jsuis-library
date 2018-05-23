/**
 * jsuis.EmptyBorder
 */
(function(jsuis) {
	var SUPER = jsuis.Border;
	jsuis.EmptyBorder = jsuis.Object.extend(SUPER, function(top, left, bottom, right) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].EmptyBorder(top, left, bottom, right));
	});
	jsuis.Object.addPeerProperties(jsuis.EmptyBorder, {
		top: 0,
		left: 0,
		bottom: 0,
		right: 0
	});
	jsuis.EmptyBorder.prototype.getBorderInsets = function(component) {
		var top = this.getTop();
		var left = this.getLeft();
		var bottom = this.getBottom();
		var right = this.getRight();
		return new jsuis.Insets(top, left, bottom, right);
	}
}) (jsuis);
