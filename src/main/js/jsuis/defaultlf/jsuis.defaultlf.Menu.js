/**
 * jsuis.defaultlf.Menu
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.MenuItem;
	jsuis.defaultlf.Menu = jsuis.Object.extend(SUPER, function(text, icon) {
		SUPER.prototype.constructor.call(this, text, icon);
	});
	jsuis.Object.addProperties(jsuis.defaultlf.Menu,
			new jsuis.Property("popupMenu"),
			new jsuis.Property("statusChanged")
	);
	jsuis.defaultlf.Menu.prototype.add = function(component, constraints, index) {
		var componentPeer = component.getPeer();
		if (componentPeer instanceof jsuis.defaultlf.MenuItem) {
			var popupMenu = this.getPopupMenu();
			if (!popupMenu) {
				popupMenu = new jsuis.defaultlf.PopupMenu();
				this.setPopupMenu(popupMenu);
			}
			popupMenu.add(component, constraints, index);
			component.setParent(this);
		} else {
			SUPER.prototype.add.call(this, component, constraints, index);
		}
	}
	jsuis.defaultlf.Menu.prototype.isPopupMenuVisible = function() {
		var popupMenu = this.getPopupMenu();
		return popupMenu.isVisible();
	}
	jsuis.defaultlf.Menu.prototype.setPopupMenuVisible = function(popupMenuVisible) {
		var popupMenu = this.getPopupMenu();
		if (!popupMenu) {
			return;
		}
		if (popupMenuVisible) {
			popupMenu.show(this, 0, this.getHeight());
		} else {
			popupMenu.setVisible(false);
		}
		return this;
	}
	jsuis.defaultlf.Menu.prototype.mousePressed = function() {
		this.setSelected(!this.isSelected());
	}
	jsuis.defaultlf.Menu.prototype.mouseReleased = function() {
	}
	jsuis.defaultlf.Menu.prototype.mouseEntered = function() {
		var selected = this.isSelected();
		if (selected) {
			this.paintPressed();
		} else {
			this.paintRollover();
		}
		this.setRollover(true);
	}
	jsuis.defaultlf.Menu.prototype.mouseExited = function() {
		var selected = this.isSelected();
		if (selected) {
			this.paintPressed();
		} else {
			this.paint();
		}
		this.setRollover(false);
	}
	jsuis.defaultlf.Menu.prototype.setSelected = function(selected) {
		this.setPopupMenuVisible(selected);
		if (selected) {
			this.paintPressed();
		} else {
			var rollover = this.isRollover();
			if (rollover) {
				this.paintRollover();
			} else {
				this.paint();
			}
		}
		SUPER.prototype.setSelected.call(this, selected);
		return this;
	}
}) (jsuis);
