/**
 * jsuis.lf.TableCellEditor
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Component;
	jsuis.lf.TableCellEditor = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this, document.createElement("input"));
		this.setAttribute("type", "text");
		this.setStyleProperty("position", "absolute");
		this.setStyleProperty("padding", "0");
		this.setStyleProperty("margin", "0");
		this.setStyleProperty("border", "0");
		this.setStyleProperty("outline", "none");
		this.setStyleProperty("background-color", "transparent");
		this.setVisible(false);
		new jsuis.lf.Component(document.body).add(this);
		var focusListener = new jsuis.FocusListener({
			focusLost: function(event) {
				var tableCellEditor = this.getListenerComponent();
				var tableCell = tableCellEditor.getTableCell();
				if (tableCell) {
					tableCellEditor.uninstall(tableCell);
				}
			}
		});
		focusListener.setListenerComponent(this);
		this.addFocusListener(focusListener);
	});
	jsuis.Object.addProperties(jsuis.lf.TableCellEditor, {
		tableCell: null
	});
	var instance;
	jsuis.lf.TableCellEditor.getInstance = function() {
		if (!instance) {
			instance = new jsuis.lf.TableCellEditor();
		}
		return instance;
	}
	jsuis.lf.TableCellEditor.prototype.install = function(tableCell) {
		var oldTableCell = this.getTableCell();
		if (oldTableCell) {
			this.uninstall(oldTableCell);
		}
		if (tableCell) {
			var label = tableCell.getLabel();
			var labelBoundingClientRect = label.getElement().getBoundingClientRect();
			var tableCellBoundingClientRect = tableCell.getElement().getBoundingClientRect();
			var bodyBoundingClientRect = document.body.getBoundingClientRect();
			var dx = labelBoundingClientRect.left - tableCellBoundingClientRect.left;
			var dy = labelBoundingClientRect.top - tableCellBoundingClientRect.top;
			this.setBounds(new jsuis.Rectangle(
					labelBoundingClientRect.left - bodyBoundingClientRect.left, labelBoundingClientRect.top - bodyBoundingClientRect.top - dy,
					tableCellBoundingClientRect.width - 2 * dx, labelBoundingClientRect.height + 2 * dy));
			this.setFont(label.getFont());
			this.setText(label.getText());
			label.setVisible(false);
			this.setVisible(true);
		}
		this.tableCell = tableCell;
		return this;
	}
	jsuis.lf.TableCellEditor.prototype.uninstall = function(tableCell) {
		tableCell.setText(this.getText());
		this.setVisible(false);
		var label = tableCell.getLabel();
		label.setVisible(true);
		tableCell.setEditor(null);
	}
	jsuis.lf.TableCellEditor.prototype.getText = function() {
		var element = this.getElement();
		return element.value;
	}
	jsuis.lf.TableCellEditor.prototype.setText = function(text) {
		var element = this.getElement();
		element.value = nvl(text, "");
		return this;
	}
	jsuis.lf.TableCellEditor.prototype.setX = function(x) {
		this.x = x;
		/*
		var outsets = this.getOutsets();
		this.setStyleProperty("left", (+nvl(x, 0) + outsets.getLeft()) + "px");
		*/
		this.setStyleProperty("left", +nvl(x, 0) + "px");
		return this;
	}
	jsuis.lf.TableCellEditor.prototype.setY = function(y) {
		this.y = y;
		/*
		var outsets = this.getOutsets();
		this.setStyleProperty("top", (+nvl(y, 0) + outsets.getTop()) + "px");
		*/
		this.setStyleProperty("top", +nvl(y, 0) + "px");
		return this;
	}
	jsuis.lf.TableCellEditor.prototype.setWidth = function(width) {
		this.width = width;
		/*
		var outsets = this.getOutsets();
		width -= outsets.getLeft() + outsets.getRight();
		*/
		if (width >= 0) {
			this.setStyleProperty("width", width + "px");
		}
		return this;
	}
	jsuis.lf.TableCellEditor.prototype.setHeight = function(height) {
		this.height = height;
		/*
		var outsets = this.getOutsets();
		height -= outsets.getTop() + outsets.getBottom();
		*/
		if (height >= 0) {
			this.setStyleProperty("height", height + "px");
		}
		return this;
	}
}) (jsuis);
