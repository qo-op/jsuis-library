/**
 * jsuis.defaultlf.TreeCellRenderer
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.defaultlf.TreeCellRenderer = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this);
		this.setRowHeight(18);
		this.setLeafIcon(new jsuis.defaultlf.PathIcon("M 2.5 .5 l 7 0 l 4 4 l 0 11 l -11 0 z M 9.5 .5 l 0 4 l 4 0"));
	});
	jsuis.Object.addProperties(jsuis.defaultlf.TreeCellRenderer,
			new jsuis.Property("rowHeight"),
			new jsuis.Property("leafIcon"),
			new jsuis.Property("closedIcon")
	);
	jsuis.defaultlf.TreeCellRenderer.prototype.getTreeCellRendererComponent = function(
			tree, value, sel, expanded, leaf, row, hasFocus) {
		var button = new jsuis.defaultlf.Button();
		button.setText(nvl(value, "").toString(), jsuis.BorderConstraints.CENTER.withFill(jsuis.Constants.BOTH));
		var leftIcon = new jsuis.defaultlf.Panel(new jsuis.GridBagLayout());
		leftIcon.add(new jsuis.defaultlf.Path("M 6 4 l -6 -4 v 8 z"));
		leftIcon.setPreferredSize(new jsuis.Dimension(16, 16));
		button.add(leftIcon, jsuis.BorderConstraints.WEST);
		button.setBorder(null);
		button.setBackground(jsuis.Color.Black.withAlpha(0));
		return button;
	}
	
}) (jsuis);
