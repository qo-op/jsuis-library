/**
 * jsuis.lf.MenuItem
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Button;
	jsuis.lf.MenuItem = jsuis.Object.extend(SUPER, function(text, icon) {
		SUPER.prototype.constructor.call(this, nvl(text, ""), icon);
		this.setBorder(new jsuis.lf.Border());
		this.setBackground(jsuis.Color.Black.withAlpha(0));
		var mouseListener = new jsuis.MouseListener({
			mouseClicked: function(event) {
				var menuItem = this.getListenerComponent();
				if (menuItem instanceof jsuis.lf.Menu) {
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
