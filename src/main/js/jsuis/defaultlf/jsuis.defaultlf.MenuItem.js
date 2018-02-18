/**
 * jsuis.defaultlf.MenuItem
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Button;
	jsuis.defaultlf.MenuItem = jsuis.Object.extend(SUPER, function(text, icon) {
		SUPER.prototype.constructor.call(this, nvl(text, ""), icon);
		this.setBorder(null);
		this.setBackground(jsuis.Color.Black.withAlpha(0));
		this.addMouseListener(new jsuis.MouseListener({
			mouseClicked: function(event) {
				var menuItem = event.getSource();
				if (menuItem instanceof jsuis.defaultlf.Menu) {
					return;
				}
				var menu = menuItem.getParent();
				var menuBar = menu.getParent();
				menuBar.setSelected(null);
			}
		}));
	});
	jsuis.defaultlf.MenuItem.prototype.setText = function(text, textConstraints) {
		SUPER.prototype.setText.call(this, text, new jsuis.GridBagConstraints().setGridx(1).setGridy(0)
				.setWeightx(1).setFill(jsuis.Constants.HORIZONTAL).setAnchor(jsuis.Constants.WEST));
		return this;
	}
}) (jsuis);
