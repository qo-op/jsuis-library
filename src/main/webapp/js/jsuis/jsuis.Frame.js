/**
 * jsuis.Frame
 */
(function(jsuis) {
	var SUPER = jsuis.Component;
	jsuis.Frame = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this, document.createElementNS(jsuis.Constants.SVG, "svg"));
		this.setVisible(false);
		SUPER.prototype.setLayout.call(this, new jsuis.BorderLayout());
		var rootPane = new jsuis.RootPane();
		this.setRootPane(rootPane);
		SUPER.prototype.add.call(this, rootPane);
		var contentPane = new jsuis.Panel(new jsuis.BorderLayout());
		this.setContentPane(contentPane);
		rootPane.add(contentPane, jsuis.Constants.FRAME_CONTENT_LAYER);
		this.setBackground(jsuis.Color.getColor(0xEEEEEE));
		var browserWindow = jsuis.BrowserWindow.getInstance();
		var browserWindowComponentListeners = browserWindow.getComponentListeners();
		var i = 0;
		for (; i < browserWindowComponentListeners.length; i++) {
			var browserWindowComponentListener = browserWindowComponentListeners[i];
			if (browserWindowComponentListener.getListenerComponent() === this) {
				break;
			}
		}
		if (i === browserWindowComponentListeners.length) {
			var componentListener = new jsuis.ComponentListener({
				componentResized: function(event) {
					var component = this.getListenerComponent();
					component.validate();
				}
			});
			componentListener.setListenerComponent(this);
			browserWindow.addComponentListener(componentListener);
		}
	});
	jsuis.Object.addProperties(jsuis.Frame,
			new jsuis.Property("rootPane"),
			new jsuis.Property("contentPane")
	);
	jsuis.Frame.prototype.add = function(component, constraints, index) {
		var contentPane = this.getContentPane();
		contentPane.add(component, constraints, index);
	}
	jsuis.Frame.prototype.remove = function(component) {
		var contentPane = this.getContentPane();
		contentPane.remove(component);
	}
	jsuis.Frame.prototype.removeAll = function() {
		var contentPane = this.getContentPane();
		contentPane.removeAll();
	}
	jsuis.Frame.prototype.getLayout = function() {
		var contentPane = this.getContentPane();
		return contentPane.getLayout();
	}
	jsuis.Frame.prototype.setLayout = function(layout) {
		var contentPane = this.getContentPane();
		contentPane.setLayout(layout);
		return this;
	}
	jsuis.Frame.prototype.validate = function() {
		var parent = this.getParent();
		if (!parent) {
			return;
		}
		var parentElement = parent.getElement();
		SUPER.prototype.setWidth.call(this, parentElement.clientWidth);
		SUPER.prototype.setHeight.call(this, parentElement.clientHeight);
		SUPER.prototype.validate.call(this);
	}
	jsuis.Frame.prototype.doLayout = function() {
		var layout = SUPER.prototype.getLayout.call(this);
		if (layout) {
			layout.layoutContainer(this);
		}
	}
	jsuis.Frame.prototype.setVisible = function(visible) {
		SUPER.prototype.setVisible.call(this, visible);
		if (visible) {
			this.validate();
		}
		return this;
	}
	jsuis.Frame.prototype.getBackground = function() {
		var contentPane = this.getContentPane();
		return contentPane.getBackground();
	}
	jsuis.Frame.prototype.setBackground = function(background) {
		var contentPane = this.getContentPane();
		contentPane.setBackground(background);
		return this;
	}
	jsuis.Frame.prototype.dispose = function() {
		var browserWindow = jsuis.BrowserWindow.getInstance();
		var browserWindowComponentListeners = browserWindow.getComponentListeners();
		for (var i = 0; i < browserWindowComponentListeners.length; i++) {
			var browserWindowComponentListener = browserWindowComponentListeners[i];
			if (browserWindowComponentListener.getListenerComponent() === this) {
				browserWindow.removeComponentListener(browserWindowComponentListener);
			}
		}
	}
}) (jsuis);
