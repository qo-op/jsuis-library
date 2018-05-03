/**
 * jsuis.defaultlf.TreeCellRenderer
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.defaultlf.TreeCellRenderer = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this);
		this.setRowHeight(18);
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
		treeCellRendererComponent.setBorder(null);
		treeCellRendererComponent.setBackground(jsuis.Color.Black.withAlpha(0));
		treeCellRendererComponent.setText(nvl(value, "").toString(), jsuis.BorderConstraints.CENTER.withFill(jsuis.Constants.BOTH));
		var icon;
		if (icon) {
			treeCellRendererComponent.setIcon(this.getIcon(icon));
		} else if (leaf) {
			treeCellRendererComponent.setIcon(this.getIcon("leaf"));
		} else if (expanded) {
			treeCellRendererComponent.setIcon(this.getIcon("open"));
		} else {
			treeCellRendererComponent.setIcon(this.getIcon("closed"));
		}
		return treeCellRendererComponent;
	}
}) (jsuis);
