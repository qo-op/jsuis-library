/**
 * jsuis.defaultlf.TreeCellRenderer
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.defaultlf.TreeCellRenderer = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this);
	});
	jsuis.defaultlf.TreeCellRenderer.prototype.getTreeCellRendererComponent = function(
			tree, value, sel, expanded, leaf, row, hasFocus) {
		var button = new jsuis.defaultlf.Button();
		button.setText(nvl(value, "").toString(), new jsuis.GridBagConstraints().setGridx(2).setGridy(0)
				.setWeightx(1).setFill(jsuis.Constants.HORIZONTAL).setAnchor(jsuis.Constants.WEST));
		/*
		button.setIcon(icon, new jsuis.GridBagConstraints().setGridx(1).setGridy(0));
		 */
		var leftIcon = new jsuis.defaultlf.Panel(new jsuis.GridBagLayout());
		leftIcon.add(new jsuis.defaultlf.Path("M 6 4 l -6 -4 v 8 z"));
		leftIcon.setPreferredSize(new jsuis.Dimension(16, 16));
		button.add(leftIcon, new jsuis.GridBagConstraints().setGridx(0).setGridy(0));
		button.setBorder(null);
		button.setBackground(jsuis.Color.Black.withAlpha(0));
		return button;
	}
	jsuis.defaultlf.TreeCellRenderer.prototype.add = function(component, constraints, index) {
		var component = component.getPeer();
		if (component instanceof jsuis.defaultlf.TreeNode) {
			var panel = this.getPanel();
			if (!panel) {
				panel = new jsuis.defaultlf.Panel(new jsuis.BorderLayout());
				this.setPanel(panel);
				var parent = this.getParent();
				if (parent instanceof jsuis.defaultlf.Tree) {
					parent.add(panel, jsuis.Constants.NORTH);
				} else {
					var parentPanel = parent.getPanel();
					var parentPanelComponents = parentPanel.getComponents();
					parentPanel.add(panel, jsuis.Constants.NORTH, parentPanelComponents.indexOf(this) + 1);
				}
			}
			panel.add(component, nvl(constraints, jsuis.Constants.NORTH), index);
			var button = this.getButton();
			var buttonPadding = button.getPadding();
			component.getButton().setPadding(buttonPadding.add(new jsuis.Insets(0, 16, 0, 0)));
			component.setParent(this);
		} else {
			SUPER.prototype.add.call(this, component, constraints, index);
		}
	}
}) (jsuis);
