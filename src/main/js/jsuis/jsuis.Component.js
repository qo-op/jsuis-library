/**
 * jsuis.Component
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.Component = jsuis.Object.extend(SUPER, function(element) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].Component(element));
	});
	jsuis.Object.addPeerProperties(jsuis.Component, {
		element: null,
		name: null,
		components: null,
		// parent: null,
		layout: null,
		constraints: null,
		x: 0,
		y: 0,
		location: null,
		width: 0,
		height: 0,
		size: null,
		preferredSize: null,
		minimumSize: null,
		bounds: null,
		padding: null,
		margin: null,
		border: null,
		insets: null,
		outsets: null,
		opaque: null,
		background: null,
		foreground: null,
		font: null,
		icon: null,
		cursor: null,
		actionCommand: null
	});
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
		peer.removeAll();
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
	jsuis.Component.prototype.paint = function() {
		var peer = this.getPeer();
		peer.paint();
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
	jsuis.Component.prototype.addMouseAdapter = function(mouseAdapter) {
		var peer = this.getPeer();
		peer.addMouseAdapter(mouseAdapter);
	}
	jsuis.Component.prototype.removeMouseAdapter = function(mouseAdapter) {
		var peer = this.getPeer();
		peer.removeMouseAdapter(mouseAdapter);
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
	jsuis.Component.prototype.addActionListener = function(actionListener) {
		var peer = this.getPeer();
		peer.addActionListener(actionListener);
	}
	jsuis.Component.prototype.removeActionListener = function(actionListener) {
		var peer = this.getPeer();
		peer.removeActionListener(actionListener);
	}
}) (jsuis);
