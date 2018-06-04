/**
 * jsuis.defaultlf.MenuItem
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Button;
	jsuis.defaultlf.MenuItem = jsuis.Object.extend(SUPER, function(text, icon) {
		SUPER.prototype.constructor.call(this, nvl(text, ""), icon);
		this.setBorder(new jsuis.defaultlf.Border());
		this.setBackground(jsuis.Color.Black.withAlpha(0));
		var mouseListener = new jsuis.MouseListener({
			mouseClicked: function(event) {
				var menuItem = this.getListenerComponent();
				if (menuItem instanceof jsuis.defaultlf.Menu) {
					return;
				}
				var menu = menuItem.getParent();
				var menuBar = menu.getParent();
				menuBar.setSelected(null);
			}
		});
		mouseListener.setListenerComponent(this);
		this.addMouseListener(mouseListener);
	});
}) (jsuis);
