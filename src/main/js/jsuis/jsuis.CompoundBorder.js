/**
 * jsuis.CompoundBorder
 */
(function(jsuis) {
	var SUPER = jsuis.Border;
	jsuis.CompoundBorder = jsuis.Object.extend(SUPER, function(outsideBorder, insideBorder) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].CompoundBorder(outsideBorder, insideBorder));
	});
	jsuis.Object.addPeerProperties(jsuis.CompoundBorder, {
		outsideBorder: null,
		insideBorder: null
	});
	jsuis.CompoundBorder.prototype.getBorderInsets = function(component) {
		var outsideBorder = this.getOutsideBorder();
		var outsideBorderInsets = outsideBorder.getBorderInsets();
		var insideBorder = this.getInsideBorder();
		var insideBorderInsets = insideBorder.getBorderInsets();
		return new jsuis.Insets(
				outsideBorderInsets.getTop() + insideBorderInsets.getTop(),
				outsideBorderInsets.getLeft() + insideBorderInsets.getLeft(),
				outsideBorderInsets.getBottom() + insideBorderInsets.getBottom(),
				outsideBorderInsets.getRight() + insideBorderInsets.getRight());
	}
}) (jsuis);
