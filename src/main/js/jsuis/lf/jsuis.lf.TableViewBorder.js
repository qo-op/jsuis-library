/**
 * jsuis.lf.TableViewBorder
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Border;
	jsuis.lf.TableViewBorder = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this);
	});
	jsuis.Object.addProperties(jsuis.lf.TableViewBorder, {
	});
	jsuis.lf.TableViewBorder.prototype.getBorderInsets = function(component) {
		return new jsuis.Insets();
	}
	jsuis.lf.TableViewBorder.prototype.paintBorder = function(component) {
		var table = component.getTable();
		var tableBorder = table.getBorder();
		tableBorder.paintBorder(table);
	}
}) (jsuis);
