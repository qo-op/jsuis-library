/**
 * jsuis.Component
 */
(function(jsuis) {
	var SUPER = jsuis.Peer;
	jsuis.Component = jsuis.Object.extend(SUPER, function(element) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].Component(element));
	});
	jsuis.Object.addPeerProperties(jsuis.Component,
			new jsuis.Property("element"),
			new jsuis.Property("components"),
			new jsuis.Property("parent"),
			new jsuis.Property("layout"),
			new jsuis.Property("constraints"),
			new jsuis.Property("anchor"),
			new jsuis.Property("fill"),
			new jsuis.Property("x"),
			new jsuis.Property("y"),
			new jsuis.Property("location"),
			new jsuis.Property("width"),
			new jsuis.Property("height"),
			new jsuis.Property("size"),
			new jsuis.Property("preferredSize"),
			new jsuis.Property("minimumSize"),
			new jsuis.Property("bounds"),
			new jsuis.Property("maximumLayoutBounds"),
			new jsuis.Property("padding"),
			new jsuis.Property("margin"),
			new jsuis.Property("layoutPadding"),
			new jsuis.Property("layoutMargin"),
			new jsuis.Property("border"),
			new jsuis.Property("insets"),
			new jsuis.Property("outsets"),
			new jsuis.Property("background"),
			new jsuis.Property("foreground"),
			new jsuis.Property("font"),
			new jsuis.Property("cursor"),
			new jsuis.Property("actionCommand")
	);
	jsuis.Component.prototype.getPeer = function() {
		return this.peer;
	}
	jsuis.Component.prototype.setPeer = function(peer) {
		this.peer = peer;
		return this;
	}
	jsuis.Component.prototype.add = function(component, constraints, index) {
		var peer = this.getPeer();
		peer.add(component, constraints, index);
	}
	jsuis.Component.prototype.remove = function(component) {
		var peer = this.getPeer();
		peer.remove(component);
	}
	jsuis.Component.prototype.removeAll = function() {
		var peer = this.getPeer();
		peer.removeAll(component);
	}
	jsuis.Component.prototype.isLeftToRight = function() {
		var peer = this.getPeer();
		return peer.isLeftToRight();
	}
	jsuis.Component.prototype.setLeftToRight = function(leftToRight) {
		var peer = this.getPeer();
		peer.setLeftToRight(leftToRight);
		return this;
	}
	jsuis.Component.prototype.validate = function() {
		var peer = this.getPeer();
		peer.validate();
	}
	jsuis.Component.prototype.isVisible = function() {
		var peer = this.getPeer();
		return peer.isVisible();
	}
	jsuis.Component.prototype.setVisible = function(visible) {
		var peer = this.getPeer();
		peer.setVisible(visible);
		return this;
	}
	jsuis.Component.prototype.isEnabled = function() {
		var peer = this.getPeer();
		return peer.isEnabled();
	}
	jsuis.Component.prototype.setEnabled = function(enabled) {
		var peer = this.getPeer();
		peer.setEnabled(enabled);
		return this;
	}
	jsuis.Component.prototype.isPressed = function() {
		var peer = this.getPeer();
		return peer.isPressed();
	}
	jsuis.Component.prototype.setPressed = function(pressed) {
		var peer = this.getPeer();
		peer.setPressed(pressed);
		return this;
	}
	jsuis.Component.prototype.requestFocus = function() {
		var peer = this.getPeer();
		peer.requestFocus();
	}
	jsuis.Component.prototype.addComponentListener = function(componentListener) {
		var peer = this.getPeer();
		peer.addComponentListener(componentListener);
	}
	jsuis.Component.prototype.removeComponentListener = function(componentListener) {
		var peer = this.getPeer();
		peer.removeComponentListener(componentListener);
	}
	jsuis.Component.prototype.addMouseListener = function(mouseListener) {
		var peer = this.getPeer();
		peer.addMouseListener(mouseListener);
	}
	jsuis.Component.prototype.removeMouseListener = function(mouseListener) {
		var peer = this.getPeer();
		peer.removeMouseListener(mouseListener);
	}
	jsuis.Component.prototype.addMouseMotionListener = function(mouseMotionListener) {
		var peer = this.getPeer();
		peer.addMouseMotionListener(mouseMotionListener);
	}
	jsuis.Component.prototype.removeMouseMotionListener = function(mouseMotionListener) {
		var peer = this.getPeer();
		peer.removeMouseMotionListener(mouseMotionListener);
	}
	jsuis.Component.prototype.addFocusListener = function(focusListener) {
		var peer = this.getPeer();
		peer.addFocusListener(focusListener);
	}
	jsuis.Component.prototype.removeFocusListener = function(focusListener) {
		var peer = this.getPeer();
		peer.removeFocusListener(focusListener);
	}
	jsuis.Component.prototype.addPropertyChangeListener = function(propertyChangeListener) {
		var peer = this.getPeer();
		peer.addPropertyChangeListener(propertyChangeListener);
	}
	jsuis.Component.prototype.removePropertyChangeListener = function(propertyChangeListener) {
		var peer = this.getPeer();
		peer.removePropertyChangeListener(propertyChangeListener);
	}
	jsuis.Component.prototype.getPropertyChangeListeners = function(propertyName) {
		var peer = this.getPeer();
		peer.getPropertyChangeListeners(propertyName);
	}
	jsuis.Component.prototype.addActionListener = function(actionListener) {
		var peer = this.getPeer();
		peer.addActionListener(actionListener);
	}
	jsuis.Component.prototype.removeActionListener = function(actionListener) {
		var peer = this.getPeer();
		peer.removeActionListener(actionListener);
	}
}) (jsuis);
