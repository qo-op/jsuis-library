/**
 * jsuis.defaultlf.PopupMenu
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Panel;
	jsuis.defaultlf.PopupMenu = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this, new jsuis.BorderLayout());
	});
	jsuis.defaultlf.PopupMenu.prototype.add = function(component, constraints, index) {
		SUPER.prototype.add(component, nvl(constraints, jsuis.Constants.NORTH), index);
	}
}) (jsuis);
