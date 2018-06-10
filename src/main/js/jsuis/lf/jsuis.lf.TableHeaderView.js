/**
 * jsuis.lf.TableHeaderView
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Svg;
	jsuis.lf.TableHeaderView = jsuis.Object.extend(SUPER, function(table) {
		SUPER.prototype.constructor.call(this, null);
		this.setTable(table);
		this.setBorder(new jsuis.lf.TableHeaderViewBorder());
		this.setX(0);
		this.setY(0);
	});
	jsuis.Object.addProperties(jsuis.lf.TableHeaderView, {
		table: null,
		x: 0,
		y: 0
	});
	jsuis.lf.TableHeaderView.prototype.getPreferredSize = function() {
		var table = this.getTable();
		var rowHeight = table.getRowHeight();
		var columnWidth = table.getColumnWidth();
		var columnCount = table.getColumnCount();
		return new jsuis.Dimension(columnCount * columnWidth, rowHeight);
	}
	jsuis.lf.TableHeaderView.prototype.getViewportSize = function() {
		var parent = this.getParent();
		if (parent instanceof jsuis.lf.Viewport) {
			return parent.getPeer().getSize();
		}
		return this.getSize();
	}
}) (jsuis);
