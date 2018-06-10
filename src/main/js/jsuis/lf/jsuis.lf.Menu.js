/**
 * jsuis.lf.Menu
 */
(function(jsuis) {
	var SUPER = jsuis.lf.MenuItem;
	jsuis.lf.Menu = jsuis.Object.extend(SUPER, function(text, icon) {
		SUPER.prototype.constructor.call(this, text, icon);
	});
	jsuis.Object.addProperties(jsuis.lf.Menu, {
		popupMenu: null
	});
	jsuis.lf.Menu.prototype.add = function(component, constraints, index) {
		var component = component.getPeer();
		if ((component instanceof jsuis.lf.MenuItem) ||
				(component instanceof jsuis.lf.PopupMenuSeparator)) {
			var popupMenu = this.getPopupMenu();
			if (!popupMenu) {
				popupMenu = new jsuis.lf.PopupMenu();
				this.setPopupMenu(popupMenu);
			}
			popupMenu.add(component, constraints, index);
			component.setParent(this);
		} else {
			SUPER.prototype.add.call(this, component, constraints, index);
		}
	}
	jsuis.lf.Menu.prototype.isPopupMenuVisible = function() {
		var popupMenu = this.getPopupMenu();
		return popupMenu.isVisible();
	}
	jsuis.lf.Menu.prototype.setPopupMenuVisible = function(popupMenuVisible) {
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
	jsuis.lf.Menu.prototype.addSeparator = function() {
		var separator = new jsuis.lf.PopupMenuSeparator()
		this.add(separator);
	}
	jsuis.lf.Menu.prototype.setSelected = function(selected) {
		this.setPopupMenuVisible(selected);
		if (selected) {
			this.paintPressed();
		} else {
			var rollover = this.isRollover();
			if (rollover) {
				this.paintRollover();
			} else {
				this.paintReleased();
			}
		}
		SUPER.prototype.setSelected.call(this, selected);
		return this;
	}
	jsuis.lf.Menu.prototype.hasChanged = function() {
		return this.changed;
	}
	jsuis.lf.Menu.prototype.setChanged = function(changed) {
		this.changed = changed;
		return this;
	}
	jsuis.lf.Menu.prototype.mousePressed = function() {
		this.setChanged(false);
		var menuBar = this.getParent();
		if (!(menuBar instanceof jsuis.lf.MenuBar)) {
			return;
		}
		var selection = menuBar.getSelection();
		if (!selection) {
			menuBar.setSelected(this);
			this.setChanged(true);
		}
	}
	jsuis.lf.Menu.prototype.mouseReleased = function() {
		var menuBar = this.getParent();
		if (!(menuBar instanceof jsuis.lf.MenuBar)) {
			return;
		}
		var changed = this.hasChanged();
		if (!changed) {
			var selection = menuBar.getSelection();
			if (selection) {
				menuBar.setSelected(null);
			}
		}
	}
	jsuis.lf.Menu.prototype.mouseEntered = function() {
		var menuBar = this.getParent();
		if (!(menuBar instanceof jsuis.lf.MenuBar)) {
			return;
		}
		var selection = menuBar.getSelection();
		if (selection) {
			menuBar.setSelected(this);
		}
		var selected = this.isSelected();
		if (selected) {
			this.paintPressed();
		} else {
			this.paintRollover();
		}
		this.setRollover(true);
	}
	jsuis.lf.Menu.prototype.mouseExited = function() {
		var selected = this.isSelected();
		if (selected) {
			this.paintPressed();
		} else {
			this.paintReleased();
		}
		this.setRollover(false);
	}
}) (jsuis);
