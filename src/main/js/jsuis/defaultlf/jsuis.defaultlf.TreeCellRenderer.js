/**
 * jsuis.defaultlf.TreeCellRenderer
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.defaultlf.TreeCellRenderer = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this);
		this.setRowHeight(18);
		this.setIcon("leaf", new jsuis.defaultlf.PathIcon("M 2.5 .5 l 7 0 l 4 4 l 0 11 l -11 0 z M 9.5 .5 l 0 4 l 4 0", 16, 16)
				.setBackground(jsuis.Color.Ivory).setForeground(jsuis.Color.Gray));
		this.setIcon("close", new jsuis.defaultlf.PathIcon("M 6 4 l -6 -4 v 8 z", 8, 8)
				.setBackground(jsuis.Color.Ivory).setForeground(jsuis.Color.Gray));
		this.setIcon("open", new jsuis.defaultlf.PathIcon("M 6 4 l -6 -4 v 8 z", 8, 8)
				.setBackground(jsuis.Color.Ivory).setForeground(jsuis.Color.Gray));
	});
	jsuis.Object.addProperties(jsuis.defaultlf.TreeCellRenderer, {
		rowHeight: 0,
		icons: null
	});
	jsuis.defaultlf.TreeCellRenderer.prototype.getIcon = function(key) {
		var icons = this.getIcons();
		if (!icons) {
			icons = {};
			this.setIcons(icons);
		}
		return icons[key];
	}
	jsuis.defaultlf.TreeCellRenderer.prototype.setIcon = function(key, icon) {
		var icons = this.getIcons();
		if (!icons) {
			icons = {};
			this.setIcons(icons);
		}
		icons[key] = icon;
		return this;
	}
	jsuis.defaultlf.TreeCellRenderer.prototype.getTreeCellRendererComponent = function(
			tree, value, sel, expanded, leaf, row, hasFocus) {
		var treeCellRendererComponent = new jsuis.defaultlf.Button();
		treeCellRendererComponent.setText(nvl(value, "").toString(), jsuis.BorderConstraints.CENTER.withFill(jsuis.Constants.BOTH));
		if (leaf) {
			treeCellRendererComponent.setIcon(this.getIcon("leaf"));
		} else if (expanded) {
			treeCellRendererComponent.setIcon(this.getIcon("open"));
		} else {
			treeCellRendererComponent.setIcon(this.getIcon("close"));
		}
		treeCellRendererComponent.setBorder(null);
		treeCellRendererComponent.setBackground(jsuis.Color.Black.withAlpha(0));
		return treeCellRendererComponent;
	}
}) (jsuis);
