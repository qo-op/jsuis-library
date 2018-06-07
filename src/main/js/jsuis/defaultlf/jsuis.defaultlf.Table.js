/**
 * jsuis.defaultlf.Table
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Panel;
	jsuis.defaultlf.Table = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this, new jsuis.BorderLayout());
		this.setBorder(new jsuis.defaultlf.TableBorder());
		this.setFont(new jsuis.Font("Arial", "normal", 12));
		this.setRowHeight(16);
		this.setColumnWidth(64);
	});
	jsuis.Object.addProperties(jsuis.defaultlf.Table, {
		columns: null,
		values: null,
		rowCount: 0,
		columnCount: 0,
		rowHeight: 0,
		columnWidth: 0,
		x: 0,
		y: 0,
		width: 0,
		height: 0
	});
	jsuis.defaultlf.Table.prototype.setColumns = function(columns) {
		this.columns = columns;
		this.setColumnCount(columns.length);
	}
	jsuis.defaultlf.Table.prototype.setValues = function(values) {
		this.values = values;
		var rowCount = this.getRowCount();
		this.setRowCount(Math.max(rowCount, values.length));
		return this;
	}
	jsuis.defaultlf.Table.prototype.getRowCount = function() {
		return nvl(this.rowCount, 0);
	}
	jsuis.defaultlf.Table.prototype.getColumnCount = function() {
		return nvl(this.columnCount, 0);
	}
	jsuis.defaultlf.Table.prototype.getRowHeight = function() {
		return nvl(this.rowHeight, 0);
	}
	jsuis.defaultlf.Table.prototype.getColumnWidth = function() {
		return nvl(this.columnWidth, 0);
	}
	jsuis.defaultlf.Table.prototype.getPreferredSize = function() {
		var rowHeight = this.getRowHeight();
		var rowCount = this.getRowCount();
		var columnWidth = this.getColumnWidth();
		var columnCount = this.getColumnCount();
		return new jsuis.Dimension(columnCount * columnWidth, rowCount * rowHeight);
	}
}) (jsuis);
