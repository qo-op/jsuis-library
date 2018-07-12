/**
 * jsuis.lf.Table
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Svg;
	jsuis.lf.Table = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this, new jsuis.GridBagLayout());
		this.setFont(new jsuis.Font("Arial", "normal", 12));
		this.setRowHeight(16);
		this.setColumnWidth(64);
		
		var tableView = new jsuis.lf.TableView(this);
		this.setTableView(tableView);
		
		var tableLightweightView = new jsuis.lf.TableLightweightView(this);
		this.setTableLightweightView(tableLightweightView);
		this.add(tableLightweightView, new jsuis.GridBagConstraints()
			.setGridx(1).setGridy(1).setWeightx(1).setWeighty(1)
			.setFill(jsuis.Constants.BOTH));
		
		var tableHeaderView = new jsuis.lf.TableHeaderView(this);
		this.setTableHeaderView(tableHeaderView);
		this.add(tableHeaderView, new jsuis.GridBagConstraints()
			.setGridx(1).setGridy(0).setWeightx(1)
			.setFill(jsuis.Constants.HORIZONTAL));
		this.setBorder(new jsuis.lf.TableBorder());
	});
	jsuis.Object.addProperties(jsuis.lf.Table, {
		tableView: null,
		tableLightweightView: null,
		tableHeaderView: null,
		columns: null,
		values: null,
		rowCount: 0,
		columnCount: 0,
		rowHeight: 0,
		columnWidth: 0
	});
	jsuis.lf.Table.prototype.setColumns = function(columns) {
		this.columns = columns;
		this.setColumnCount(columns.length);
	}
	jsuis.lf.Table.prototype.setValues = function(values) {
		this.values = values;
		var rowCount = this.getRowCount();
		this.setRowCount(Math.max(rowCount, values.length));
		return this;
	}
	jsuis.lf.Table.prototype.getRowCount = function() {
		return nvl(this.rowCount, 0);
	}
	jsuis.lf.Table.prototype.getColumnCount = function() {
		return nvl(this.columnCount, 0);
	}
	jsuis.lf.Table.prototype.getRowHeight = function() {
		return nvl(this.rowHeight, 0);
	}
	jsuis.lf.Table.prototype.getColumnWidth = function() {
		return nvl(this.columnWidth, 0);
	}
}) (jsuis);
