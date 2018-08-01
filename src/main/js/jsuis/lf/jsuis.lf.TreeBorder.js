/**
 * jsuis.lf.TreeBorder
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Border;
	jsuis.lf.TreeBorder = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this);
	});
	jsuis.Object.addProperties(jsuis.lf.TreeBorder, {
		index: 0
	});
	jsuis.lf.TreeBorder.prototype.getBorderInsets = function(component) {
		return new jsuis.Insets();
	}
	jsuis.lf.TreeBorder.prototype.paintBorder = function(component) {
		
		var tree = component;
		
		var treeView = tree.getTreeView();
		if (!treeView) {
			return;
		}
		var treeViewWidth = treeView.getWidth();
		var treeViewHeight = treeView.getHeight();
		if (!treeViewWidth || !treeViewHeight) {
			return;
		}
		
		var treeViewportSize = treeView.getViewportSize();
		var treeViewportWidth = treeViewportSize.getWidth();
		var treeViewportHeight = treeViewportSize.getHeight();
		if (!treeViewportWidth || !treeViewportHeight) {
			return;
		}
		
		var treeX = tree.getX();
		var treeY = tree.getY();
		
		var rowCount = tree.getRowCount();
		var rowHeight = tree.getRowHeight();
		var columnWidth = treeViewWidth;
		var maxX = columnWidth;
		var maxY = rowCount * rowHeight;
		
		var treeViewGraphics = treeView.getGraphics();
		
		/*
		 * Row data
		 */
		var rowWidth = columnWidth;
		var rowHeight = rowHeight;
		var rows = tree.getRows();
		var cellRenderer = tree.getCellRenderer();
		
		var index = Math.ceil((0.5 - treeY) / rowHeight - 1);
		this.setIndex(index);
		
		var treeCellData = [];
		for (var r = index; r < rowCount; r++) {
			var rowY = r * rowHeight;
			if ((rowY + treeY) > treeViewportHeight) {
				break;
			}
			var node = rows[r];
			var rowX = node.getLevel() * 16;
			var textContent = node.getUserObject().toString();
			treeCellData.push({
				x: rowX, y: rowY, textContent: textContent
			});
		}
		
		var rowBackground = jsuis.Color.White.toString();
		var rowForeground = jsuis.Color.Black.toString();
		
		/*
		 * Rows
		 */
		var dy = 0;
		var treeCells = treeViewGraphics.getComponentsByName("cell");
		for (var i = treeCells.length; i < treeCellData.length; i++) {
			var treeCell = new jsuis.lf.G()
				.setName("cell")
				.setStyleProperty("visibility", "hidden");
			treeViewGraphics.add(treeCell);
			treeCells.push(treeCell);
			var treeRect = new jsuis.lf.Rect()
				.setName("rect")
				.setAttribute("x", 0)
				.setAttribute("y", 0)
				.setAttribute("width", rowWidth)
				.setAttribute("height", rowHeight)
				.setAttribute("fill", rowBackground);
			treeCell.add(treeRect);
			var treeIcon = new jsuis.lf.Image()
				.setName("icon")
				.setAttribute("width", 16)
				.setAttribute("height", 16);
			treeCell.add(treeIcon);
			var treeText = new jsuis.lf.Text()
				.setName("text")
				.setAttribute("x", 0)
				.setAttribute("y", 0)
				.setAttribute("fill", rowForeground)
				.setProperty("textContent", treeCellData[i].textContent);
			treeCell.add(treeText);
			var treeTextElement = treeText.getElement();
			var treeTextElementBBox = treeTextElement.getBBox();
			dy = -treeTextElementBBox.y;
			treeText
				.setAttribute("dy", dy);
			var mouseListener = new jsuis.MouseListener({
				index: i,
				getIndex: function() {
					return this.index;
				},
				tree: tree,
				getTree: function() {
					return this.tree;
				},
				mouseClicked: function(event) {
					var treeBorder = this.getListenerComponent();
					var tree = this.getTree();
					var rows = tree.getRows();
					var index = this.getIndex();
					
					var row = rows[treeBorder.getIndex() + index];
					var node = row;
					
					if (node) {
						
						var expanded = node.isExpanded();
						node.setExpanded(!expanded);
						
						treeBorder.paintBorder(tree);
					}
				},
			});
			mouseListener.setListenerComponent(this);
			treeCell.addMouseListener(mouseListener);
		}
		
		for (var i = treeCellData.length; i < treeCells.length; i++) {
			treeCells[i]
				.setStyleProperty("visibility", "hidden");
		}
		for (var i = 0; i < treeCellData.length; i++) {
			var treeCell = treeCells[i];
			var treeIcon = treeCell.getComponentsByName("icon")[0];
			var treeText = treeCell.getComponentsByName("text")[0];
			treeText
				.setProperty("textContent", treeCellData[i].textContent);
			var node = rows[i];
			var leaf = node.isLeaf();
			var expanded = node.isExpanded();
			var icon;
			if (leaf) {
				icon = cellRenderer.getIcon("leaf");
			} else if (expanded) {
				icon = cellRenderer.getIcon("open");
			} else {
				icon = cellRenderer.getIcon("closed");
			}
			if (icon) {
				treeIcon
					.setAttribute("width", 16)
					.setAttributeNS("http://www.w3.org/1999/xlink", "href", icon.getResource());
				treeText
					.setAttribute("x", 18);
			} else {
				treeIcon
					.setAttribute("width", 0)
					.setAttributeNS("http://www.w3.org/1999/xlink", "href", null);
				treeText
					.setAttribute("x", 0);
			}
			treeCell
				.setAttribute("transform", "translate(" + treeCellData[i].x + ", " + treeCellData[i].y + ")")
				.setStyleProperty("visibility", "visible");
		}
	}
}) (jsuis);
