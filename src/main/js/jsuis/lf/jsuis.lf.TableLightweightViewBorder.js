/**
 * jsuis.lf.TableLightweightViewBorder
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Border;
	jsuis.lf.TableLightweightViewBorder = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this);
	});
	jsuis.Object.addProperties(jsuis.lf.TableLightweightViewBorder, {
	});
	jsuis.lf.TableLightweightViewBorder.prototype.getBorderInsets = function(component) {
		return new jsuis.Insets();
	}
	jsuis.lf.TableLightweightViewBorder.prototype.paintBorder = function(component) {
		var table = component.getTable();
		var tableBorder = table.getBorder();
		tableBorder.paintBorder(table);
	}
}) (jsuis);
