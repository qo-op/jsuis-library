/**
 * jsuis.lf.TableHeaderViewBorder
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Border;
	jsuis.lf.TableHeaderViewBorder = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this);
	});
	jsuis.Object.addProperties(jsuis.lf.TableHeaderViewBorder, {
	});
	jsuis.lf.TableHeaderViewBorder.prototype.getBorderInsets = function(component) {
		return new jsuis.Insets();
	}
	jsuis.lf.TableHeaderViewBorder.prototype.paintBorder = function(component) {
		var table = component.getTable();
		var tableBorder = table.getBorder();
		tableBorder.paintBorder(table);
	}
}) (jsuis);
