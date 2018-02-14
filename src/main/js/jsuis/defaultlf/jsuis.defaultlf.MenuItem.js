/**
 * jsuis.defaultlf.MenuItem
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Button;
	jsuis.defaultlf.MenuItem = jsuis.Object.extend(SUPER, function(text, icon) {
		SUPER.prototype.constructor.call(this, text, icon);
		this.setBorder(null);
		this.setBackground(jsuis.Color.Black.withAlpha(0));
	});
	jsuis.defaultlf.MenuItem.prototype.addActionListener = function(actionListener) {
		var actionListeners = this.getActionListeners();
		actionListeners.push(actionListener);
		var mouseListener = new jsuis.MouseListener({
			mouseClicked: function(event) {
				var menuItem = event.getSource();
				menuItem.fireActionPerformed(event.getDomEvent());
				var menu = menuItem.getParent();
				menu.setSelected(false);
			}
		});
		mouseListener.setListenerComponent(actionListener.getListenerComponent());
		this.addMouseListener(mouseListener);
	}
}) (jsuis);
