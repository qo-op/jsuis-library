/**
 * jsuis.lf.TableView
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Svg;
	jsuis.lf.TableView = jsuis.Object.extend(SUPER, function(table) {
		SUPER.prototype.constructor.call(this, null);
		this.setTable(table);
		this.setBorder(new jsuis.lf.TableViewBorder());
		this.setX(0);
		this.setY(0);
	});
	jsuis.Object.addProperties(jsuis.lf.TableView, {
		table: null
	});
	jsuis.lf.TableView.prototype.getPreferredSize = function() {
		var table = this.getTable();
		var rowHeight = table.getRowHeight();
		var rowCount = table.getRowCount();
		var columnWidth = table.getColumnWidth();
		var columnCount = table.getColumnCount();
		return new jsuis.Dimension(columnCount * columnWidth, rowCount * rowHeight);
	}
	jsuis.lf.TableView.prototype.getViewportSize = function() {
		var parent = this.getParent();
		if (parent instanceof jsuis.lf.Viewport) {
			return parent.getPeer().getSize();
		}
		return this.getSize();
	}
}) (jsuis);
