/**
 * jsuis.lf.TableBorder
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Border;
	jsuis.lf.TableBorder = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this);
	});
	jsuis.Object.addProperties(jsuis.lf.TableBorder, {
	});
	jsuis.lf.TableBorder.prototype.getBorderInsets = function(component) {
		return new jsuis.Insets();
	}
	jsuis.lf.TableBorder.prototype.paintBorder = function(component) {
		
		var table = component;
		
		var tableHeaderView = table.getTableHeaderView();
		var tableView = table.getTableView();
		
		var tableHeaderViewWidth = tableHeaderView.getWidth();
		var tableHeaderViewHeight = tableHeaderView.getHeight();
		
		if (!tableHeaderViewWidth || !tableHeaderViewHeight) {
			return;
		}
		
		var tableViewWidth = tableView.getWidth();
		var tableViewHeight = tableView.getHeight();
		
		if (!tableViewWidth || !tableViewHeight) {
			return;
		}
		
		var tableHeaderViewportSize = tableHeaderView.getViewportSize();
		var tableHeaderViewportWidth = tableHeaderViewportSize.getWidth();
		var tableHeaderViewportHeight = tableHeaderViewportSize.getHeight();
		
		if (!tableHeaderViewportWidth || !tableHeaderViewportHeight) {
			return;
		}
		
		var tableViewportSize = tableView.getViewportSize();
		var tableViewportWidth = tableViewportSize.getWidth();
		var tableViewportHeight = tableViewportSize.getHeight();
		
		if (!tableViewportWidth || !tableViewportHeight) {
			return;
		}
		
		var tableX = table.getX();
		var tableY = table.getY();
		
		var rowCount = table.getRowCount();
		var columnCount = table.getColumnCount();
		var rowHeight = table.getRowHeight();
		var columnWidth = table.getColumnWidth();
		var maxX = columnCount * columnWidth;
		var maxY = rowCount * rowHeight;
		
		var tableHeaderViewGraphics = tableHeaderView.getGraphics();
		var tableViewGraphics = tableView.getGraphics();
		
		/*
		 * Horizontal line data
		 */
		var tableHeaderHorizontalData = [
			{ y: rowHeight - 0.5 }
		];
		var tableHorizontalData = [];
		for (var r = Math.ceil((0.5 - tableY) / rowHeight - 1); r < rowCount; r++) {
			var y = (r + 1) * rowHeight - 0.5;
			if ((y + tableY) < 0) {
				continue;
			} else if ((y + tableY) > tableViewportHeight) {
				break;
			}
			tableHorizontalData.push({
				y: y
			});
		}
		
		/*
		 * Vertical line data
		 */
		var tableHeaderVerticalData = [];
		for (var c = Math.ceil((0.5 - tableX) / columnWidth - 1); c < columnCount; c++) {
			var x = (c + 1) * columnWidth - 0.5;
			if ((x + tableX) < 0) {
				continue;
			} else if ((x + tableX) > tableHeaderViewportWidth) {
				break;
			}
			tableHeaderVerticalData.push({
				x: x
			});
		}
		var tableVerticalData = [];
		for (var c = Math.ceil((0.5 - tableX) / columnWidth - 1); c < columnCount; c++) {
			var x = (c + 1) * columnWidth - 0.5;
			if ((x + tableX) < 0) {
				continue;
			} else if ((x + tableX) > tableViewportWidth) {
				break;
			}
			tableVerticalData.push({
				x: x
			});
		}
		
		/*
		 * Cell data
		 */
		var columns = table.getColumns();
		var cellWidth = columnWidth - 1;
		var cellHeight = rowHeight - 1;
		var values = table.getValues();
		
		var tableHeaderCellData = [];
		for (var c = Math.ceil((0.5 - tableX) / columnWidth - 1); c < columnCount; c++) {
			var x = c * columnWidth;
			if ((x + tableX) > tableHeaderViewportWidth) {
				break;
			}
			var textContent = columns[c];
			tableHeaderCellData.push({
				x: x, textContent: textContent
			});
		}
		var tableCellData = [];
		for (var c = Math.ceil((0.5 - tableX) / columnWidth - 1); c < columnCount; c++) {
			var cellX = c * columnWidth;
			if ((cellX + tableX) > tableViewportWidth) {
				break;
			}
			for (var r = Math.ceil((0.5 - tableY) / rowHeight - 1); r < rowCount; r++) {
				var cellY = r * rowHeight;
				if ((cellY + tableY) > tableViewportHeight) {
					break;
				}
				var textContent = values[r][c];
				tableCellData.push({
					x: cellX, y: cellY, textContent: textContent
				});
			}
		}
		
		var lineStroke = jsuis.Color.DarkGray.toString();
		var headerBackground = jsuis.Color.LightGray.toString();
		var headerForeground = jsuis.Color.Black.toString();
		var cellBackground = jsuis.Color.White.toString();
		var cellForeground = jsuis.Color.Black.toString();
		
		/*
		 * Horizontal lines
		 */
		var tableHeaderHorizontals = tableHeaderViewGraphics.getComponentsByName("horizontal");
		for (var i = tableHeaderHorizontals.length; i < tableHeaderHorizontalData.length; i++) {
			var tableHeaderHorizontal = new jsuis.lf.Line()
				.setName("horizontal")
				.setAttribute("x1", 0)
				.setAttribute("y1", tableHeaderHorizontalData[i].y)
				.setAttribute("x2", maxX)
				.setAttribute("y2", tableHeaderHorizontalData[i].y)
				.setStyleProperty("stroke", lineStroke)
				.setStyleProperty("stroke-width", 1);
			tableHeaderViewGraphics.add(tableHeaderHorizontal);
			tableHeaderHorizontals.push(tableHeaderHorizontal);
		}
		var tableHorizontals = tableViewGraphics.getComponentsByName("horizontal");
		for (var i = tableHorizontals.length; i < tableHorizontalData.length; i++) {
			var tableHorizontal = new jsuis.lf.Line()
				.setStyleProperty("display", "none")
				.setName("horizontal")
				.setAttribute("x1", 0)
				.setAttribute("y1", 0)
				.setAttribute("x2", maxX)
				.setAttribute("y2", 0)
				.setStyleProperty("stroke", lineStroke)
				.setStyleProperty("stroke-width", 1);
			tableViewGraphics.add(tableHorizontal);
			tableHorizontals.push(tableHorizontal);
		}
		
		/*
		 * Vertical lines
		 */
		var tableHeaderVerticals = tableHeaderViewGraphics.getComponentsByName("vertical");
		for (var i = tableHeaderVerticals.length; i < tableHeaderVerticalData.length; i++) {
			var tableHeaderVertical = new jsuis.lf.Line()
				.setStyleProperty("display", "none")
				.setName("vertical")
				.setAttribute("x1", 0)
				.setAttribute("y1", 0)
				.setAttribute("x2", 0)
				.setAttribute("y2", rowHeight)
				.setStyleProperty("stroke", lineStroke)
				.setStyleProperty("stroke-width", 1);
			tableHeaderViewGraphics.add(tableHeaderVertical);
			tableHeaderVerticals.push(tableHeaderVertical);
		}
		var tableVerticals = tableViewGraphics.getComponentsByName("vertical");
		for (var i = tableVerticals.length; i < tableVerticalData.length; i++) {
			var tableVertical = new jsuis.lf.Line()
				.setStyleProperty("display", "none")
				.setName("vertical")
				.setAttribute("x1", 0)
				.setAttribute("y1", 0)
				.setAttribute("x2", 0)
				.setAttribute("y2", maxY)
				.setStyleProperty("stroke", lineStroke)
				.setStyleProperty("stroke-width", 1);
			tableViewGraphics.add(tableVertical);
			tableVerticals.push(tableVertical);
		}
		
		/*
		 * Header
		 */
		var dy = 0;
		var tableHeaderCells = tableHeaderViewGraphics.getComponentsByName("cell");
		for (var i = tableHeaderCells.length; i < tableHeaderCellData.length; i++) {
			var tableHeaderCell = new jsuis.lf.G()
				.setName("cell");
			tableHeaderViewGraphics.add(tableHeaderCell);
			tableHeaderCells.push(tableHeaderCell);
			var tableHeaderRect = new jsuis.lf.Rect()
				.setName("rect")
				.setAttribute("x", 0)
				.setAttribute("y", 0)
				.setAttribute("width", cellWidth)
				.setAttribute("height", cellHeight)
				.setAttribute("fill", headerBackground);
			tableHeaderCell.add(tableHeaderRect);
			var tableHeaderText = new jsuis.lf.Text()
				.setName("text")
				.setAttribute("x", 0)
				.setAttribute("y", 0)
				.setAttribute("fill", headerForeground)
				.setProperty("textContent", tableHeaderCellData[i].textContent);
			tableHeaderCell.add(tableHeaderText);
			var tableHeaderTextElement = tableHeaderText.getElement();
			var tableHeaderTextElementBBox = tableHeaderTextElement.getBBox();
			dy = -tableHeaderTextElementBBox.y;
			tableHeaderText
				.setAttribute("dy", dy);
			tableHeaderCell
				.setStyleProperty("display", "none");
		}
		if (!dy) {
			var tableHeaderCell = tableHeaderCells[0];
			var tableHeaderText = tableHeaderCell.getComponentsByName("text")[0];
			dy = tableHeaderText.getAttribute("dy");
		}
		
		/*
		 * Cells
		 */
		var tableCells = tableViewGraphics.getComponentsByName("cell");
		for (var i = tableCells.length; i < tableCellData.length; i++) {
			var tableCell = new jsuis.lf.G()
				.setName("cell");
			tableViewGraphics.add(tableCell);
			tableCells.push(tableCell);
			var tableRect = new jsuis.lf.Rect()
				.setName("rect")
				.setAttribute("x", 0)
				.setAttribute("y", 0)
				.setAttribute("width", cellWidth)
				.setAttribute("height", cellHeight)
				.setAttribute("fill", cellBackground);
			tableCell.add(tableRect);
			var tableText = new jsuis.lf.Text()
				.setName("text")
				.setAttribute("x", 0)
				.setAttribute("y", 0)
				.setAttribute("fill", cellForeground)
				.setProperty("textContent", tableCellData[i].textContent);
			tableCell.add(tableText);
			tableText
				.setAttribute("dy", dy);
			tableCell
				.setStyleProperty("display", "none");
		}
		
		/*
		 * Horizontal lines
		 */
		for (var i = tableHorizontalData.length; i < tableHorizontals.length; i++) {
			tableHorizontals[i]
				.setStyleProperty("display", "none");
		}
		for (var i = 0; i < tableHorizontalData.length; i++) {
			tableHorizontals[i]
				.setAttribute("transform", "translate(0, " + tableHorizontalData[i].y + ")")
				.setStyleProperty("display", "");
		}
		
		/*
		 * Vertical lines
		 */
		for (var i = tableHeaderVerticalData.length; i < tableHeaderVerticals.length; i++) {
			tableHeaderVerticals[i]
				.setStyleProperty("display", "none");
		}
		for (var i = 0; i < tableHeaderVerticalData.length; i++) {
			tableHeaderVerticals[i]
				.setAttribute("transform", "translate(" + tableHeaderVerticalData[i].x + ", 0)")
				.setStyleProperty("display", "");
		}
		for (var i = tableVerticalData.length; i < tableVerticals.length; i++) {
			tableVerticals[i]
				.setStyleProperty("display", "none");
		}
		for (var i = 0; i < tableVerticalData.length; i++) {
			tableVerticals[i]
				.setAttribute("transform", "translate(" + tableVerticalData[i].x + ", 0)")
				.setStyleProperty("display", "");
		}
		
		/*
		 * Header
		 */
		for (var i = tableHeaderCellData.length; i < tableHeaderCells.length; i++) {
			tableHeaderCells[i]
				.setStyleProperty("display", "none");
		}
		for (var i = 0; i < tableHeaderCellData.length; i++) {
			var tableHeaderCell = tableHeaderCells[i];
			tableHeaderCell
				.setAttribute("transform", "translate(" + tableHeaderCellData[i].x + ", 0)")
				.setStyleProperty("display", "");
			var tableHeaderText = tableHeaderCell.getComponentsByName("text")[0];
			tableHeaderText
				.setProperty("textContent", tableHeaderCellData[i].textContent)
		}
		
		/*
		 * Cells
		 */
		for (var i = tableCellData.length; i < tableCells.length; i++) {
			tableCells[i]
				.setStyleProperty("display", "none");
		}
		for (var i = 0; i < tableCellData.length; i++) {
			var tableCell = tableCells[i];
			tableCell
				.setAttribute("transform", "translate(" + tableCellData[i].x + ", " + tableCellData[i].y + ")")
				.setStyleProperty("display", "");
			var tableText = tableCell.getComponentsByName("text")[0];
			tableText
				.setProperty("textContent", tableCellData[i].textContent)
		}
	}
}) (jsuis);
