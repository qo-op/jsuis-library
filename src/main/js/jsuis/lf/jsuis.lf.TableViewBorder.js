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
		var width = component.getWidth();
		var height = component.getHeight();
		if (!width || !height) {
			return;
		}
		var x = component.getX();
		var y = component.getY();
		var viewportSize = component.getViewportSize();
		var viewportWidth = viewportSize.getWidth();
		var viewportHeight = viewportSize.getHeight();
		if (!viewportWidth || !viewportHeight) {
			return;
		}
		var table = component.getTable();
		var rowCount = table.getRowCount();
		var columnCount = table.getColumnCount();
		var rowHeight = table.getRowHeight();
		var columnWidth = table.getColumnWidth();
		var x2 = columnCount * columnWidth;
		var y2 = rowCount * rowHeight;
		var graphics = component.getGraphics();
	
		var data = [];
		for (var i = Math.ceil((0.5 - y) / rowHeight - 1); i < rowCount; i++) {
			var y1 = y + (i + 1) * rowHeight - 0.5;
			if (y1 < 0) {
				continue;
			} else if (y1 > viewportHeight) {
				break;
			}
			data.push({ x1: 0, y1: y1 - y, x2: x2, y2: y1 - y, stroke: jsuis.Color.DarkGray.toString(), strokeWidth: 1 });
		}
		var horizontals = graphics.getComponentsByName("horizontal");
		for (var i = horizontals.length; i < data.length; i++) {
			var horizontal = new jsuis.lf.Line();
			horizontal.setName("horizontal");
			graphics.add(horizontal);
			horizontals.push(horizontal);
		}
		for (var i = 0; i < data.length; i++) {
			var d = data[i];
			horizontals[i]
				.setAttribute("x1", 0)
				.setAttribute("y1", 0)
				.setAttribute("x2", d.x2)
				.setAttribute("y2", 0)
				.setStyleProperty("stroke", d.stroke)
				.setStyleProperty("stroke-width", d.strokeWidth)
				.setAttribute("transform", "translate(" + d.x1 + "," + d.y1 + ")")
				.setStyleProperty("display", "");
		}
		for (var i = data.length; i < horizontals.length; i++) {
			horizontals[i]
				.setStyleProperty("display", "none");
		}
		
		data = [];
		for (var i = Math.ceil((0.5 - x) / columnWidth - 1); i < columnCount; i++) {
			var x1 = x + (i + 1) * columnWidth - 0.5;
			if (x1 < 0) {
				continue;
			} else if (x1 > viewportWidth) {
				break;
			}
			data.push({ x1: x1 - x, y1: 0, x2: x1 - x, y2: y2, stroke: jsuis.Color.DarkGray.toString(), strokeWidth: 1 });
		}
		var verticals = graphics.getComponentsByName("vertical");
		for (var i = verticals.length; i < data.length; i++) {
			var vertical = new jsuis.lf.Line();
			vertical.setName("vertical");
			graphics.add(vertical);
			verticals.push(vertical);
		}
		for (var i = 0; i < data.length; i++) {
			var d = data[i];
			verticals[i]
				.setAttribute("x1", 0)
				.setAttribute("y1", 0)
				.setAttribute("x2", 0)
				.setAttribute("y2", d.y2)
				.setStyleProperty("stroke", d.stroke)
				.setStyleProperty("stroke-width", d.strokeWidth)
				.setAttribute("transform", "translate(" + d.x1 + "," + d.y1 + ")")
				.setStyleProperty("display", "")
		}
		for (var i = data.length; i < verticals.length; i++) {
			verticals[i]
				.setStyleProperty("display", "none");
		}
		
		data = [];
		var values = table.getValues();
		var cellWidth = columnWidth - 1;
		var cellHeight = rowHeight - 1;
		for (var j = Math.ceil((0.5 - x) / columnWidth - 1); j < columnCount; j++) {
			var cellX = x + j * columnWidth;
			if (cellX > viewportWidth) {
				break;
			}
			for (var i = Math.ceil((0.5 - y) / rowHeight - 1); i < rowCount; i++) {
				var cellY = y + i * rowHeight;
				if (cellY > viewportHeight) {
					break;
				}
				var textContent = values[i][j];
				data.push({ x: cellX - x, y: cellY - y, width: cellWidth, height: cellHeight, background: jsuis.Color.White.toString(), foreground: jsuis.Color.Black.toString(), textContent: textContent });
			}
		}
		var cells = graphics.getComponentsByName("cell");
		for (var i = cells.length; i < data.length; i++) {
			var cell = new jsuis.lf.G();
			cell.setName("cell");
			graphics.add(cell);
			cells.push(cell);
			var rect = new jsuis.lf.Rect();
			rect.setName("rect");
			cell.add(rect);
			var text = new jsuis.lf.Text();
			text.setName("text");
			cell.add(text);
		}
		for (var i = 0; i < data.length; i++) {
			var d = data[i];
			var cell = cells[i];
			var rect = cell.getComponentsByName("rect")[0];
			var text = cell.getComponentsByName("text")[0];
			rect
				.setAttribute("x", 0)
				.setAttribute("y", 0)
				.setAttribute("width", d.width)
				.setAttribute("height", d.height)
				.setAttribute("fill", d.background)
				.setAttribute("transform", "translate(" + d.x + "," + d.y + ")")
				.setStyleProperty("display", "");
			text
				.setAttribute("x", 0)
				.setAttribute("y", 0)
				.setAttribute("fill", d.foreground)
				.setProperty("textContent", d.textContent)
				.setAttribute("transform", (function() {
					var element = text.getElement();
					var bbox = element.getBBox();
					var dy = d.y - bbox.y;
					return "translate(" + d.x + "," + dy + ")";
				})())
				.setStyleProperty("display", "");
		}
		for (var i = data.length; i < verticals.length; i++) {
			var cell = cells[i];
			var rect = cell.getComponentsByName("rect")[0];
			var text = cell.getComponentsByName("text")[0];
			rect
				.setStyleProperty("display", "none");
			text
				.setStyleProperty("display", "none");
		}
	}
}) (jsuis);
