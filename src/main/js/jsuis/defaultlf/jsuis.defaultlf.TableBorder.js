/**
 * jsuis.defaultlf.TableBorder
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Border;
	jsuis.defaultlf.TableBorder = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this);
	});
	jsuis.Object.addProperties(jsuis.defaultlf.TableBorder, {
	});
	jsuis.defaultlf.TableBorder.prototype.getBorderInsets = function(component) {
		return new jsuis.Insets();
	}
	jsuis.defaultlf.TableBorder.prototype.paintBorder = function(component) {
		var width = component.getWidth();
		var height = component.getHeight();
		if (!width || !height) {
			return;
		}
		var rowCount = component.getRowCount();
		var columnCount = component.getColumnCount();
		var rowHeight = component.getRowHeight();
		var columnWidth = component.getColumnWidth();
		var x2 = columnCount * columnWidth;
		var y2 = rowCount * rowHeight;
		var data = [];
		for (var i = 0; i < rowCount; i++) {
			var y = (i + 1) * rowHeight + 0.5;
			data.push({ x1: 0, y1: y, x2: x2, y2: y, stroke: jsuis.Color.DarkGray.toString(), strokeWidth: 1 });
		}
		for (var i = 0; i < columnCount; i++) {
			var x = (i + 1) * columnWidth + 0.5;
			data.push({ x1: x, y1: 0, x2: x, y2: y2, stroke: jsuis.Color.DarkGray.toString(), strokeWidth: 1 });
		}
		var graphics = component.getGraphics();
		graphics
			.select("line")
			.data(data)
			.enter().append("line")
			.all()
				.setAttribute("x1", function(d) { return d.x1; })
				.setAttribute("y1", function(d) { return d.y1; })
				.setAttribute("x2", function(d) { return d.x2; })
				.setAttribute("y2", function(d) { return d.y2; })
				.setStyleProperty("stroke", function(d) { return d.stroke; })
				.setStyleProperty("stroke-width", function(d) { return d.strokeWidth; })
			.exit()
				.setStyleProperty("display", "none");
	}
}) (jsuis);
