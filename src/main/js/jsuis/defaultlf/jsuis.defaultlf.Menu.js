/**
 * jsuis.defaultlf.Menu
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.MenuItem;
	jsuis.defaultlf.Menu = jsuis.Object.extend(SUPER, function(text, icon) {
		SUPER.prototype.constructor.call(this, text, icon);
	});
	jsuis.Object.addProperties(jsuis.defaultlf.Menu,
			new jsuis.Property("popupMenu")
	);
	jsuis.defaultlf.Menu.prototype.add = function(component, constraints, index) {
		var componentPeer = component.getPeer();
		if ((componentPeer instanceof jsuis.defaultlf.MenuItem) ||
				(componentPeer instanceof jsuis.defaultlf.PopupMenuSeparator)) {
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
	jsuis.defaultlf.Menu.prototype.addSeparator = function() {
		var separator = new jsuis.defaultlf.PopupMenuSeparator()
		this.add(separator);
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
	jsuis.defaultlf.Menu.prototype.hasChanged = function() {
		return this.changed;
	}
	jsuis.defaultlf.Menu.prototype.setChanged = function(changed) {
		this.changed = changed;
		return this;
	}
	jsuis.defaultlf.Menu.prototype.mousePressed = function() {
		this.setChanged(false);
		var menuBar = this.getParent();
		if (!(menuBar instanceof jsuis.defaultlf.MenuBar)) {
			return;
		}
		var selection = menuBar.getPeer().getSelection();
		if (!selection) {
			menuBar.getPeer().setSelected(this);
			this.setChanged(true);
		}
	}
	jsuis.defaultlf.Menu.prototype.mouseReleased = function() {
		var menuBar = this.getParent();
		if (!(menuBar instanceof jsuis.defaultlf.MenuBar)) {
			return;
		}
		var changed = this.hasChanged();
		if (!changed) {
			var selection = menuBar.getPeer().getSelection();
			if (selection) {
				menuBar.getPeer().setSelected(null);
			}
		}
	}
	jsuis.defaultlf.Menu.prototype.mouseEntered = function() {
		var menuBar = this.getParent();
		if (!(menuBar instanceof jsuis.defaultlf.MenuBar)) {
			return;
		}
		var selection = menuBar.getPeer().getSelection();
		if (selection) {
			menuBar.getPeer().setSelected(this);
		}
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
}) (jsuis);
