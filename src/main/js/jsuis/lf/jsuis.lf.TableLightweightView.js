/**
 * jsuis.lf.TableLightweightView
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Panel;
	jsuis.lf.TableLightweightView = jsuis.Object.extend(SUPER, function(table) {
		SUPER.prototype.constructor.call(this, null);
		this.setTable(table);
		this.setBorder(new jsuis.lf.TableLightweightViewBorder());
		this.setX(0);
		this.setY(0);
	});
	jsuis.Object.addProperties(jsuis.lf.TableLightweightView, {
		table: null,
		x: 0,
		y: 0
	});
	jsuis.lf.TableLightweightView.prototype.getPreferredSize = function() {
		var table = this.getTable();
		var rowHeight = table.getRowHeight();
		var rowCount = table.getRowCount();
		var columnWidth = table.getColumnWidth();
		var columnCount = table.getColumnCount();
		return new jsuis.Dimension(columnCount * columnWidth, rowCount * rowHeight);
	}
	jsuis.lf.TableLightweightView.prototype.getViewportSize = function() {
		var parent = this.getParent();
		if (parent instanceof jsuis.lf.Viewport) {
			return parent.getPeer().getSize();
		}
		return this.getSize();
	}
}) (jsuis);
