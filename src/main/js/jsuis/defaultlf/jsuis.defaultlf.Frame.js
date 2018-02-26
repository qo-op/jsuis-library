/**
 * jsuis.defaultlf.Frame
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Component;
	jsuis.defaultlf.Frame = jsuis.Object.extend(SUPER, function(title) {
		SUPER.prototype.constructor.call(this, document.createElementNS(jsuis.Constants.SVG, "svg"));
		SUPER.prototype.setLayout.call(this, new jsuis.BorderLayout());
		var rootPane = new jsuis.defaultlf.RootPane();
		this.setRootPane(rootPane);
		SUPER.prototype.add.call(this, rootPane);
		var contentPane = new jsuis.defaultlf.Panel(new jsuis.BorderLayout());
		this.setContentPane(contentPane);
		this.setBackground(jsuis.Color.getColor(0xEEEEEE));
		
		var browserWindow = jsuis.defaultlf.BrowserWindow.getInstance();
		var componentListener = new jsuis.ComponentListener({
			componentResized: function(event) {
				var frame = this.getListenerComponent();
				frame.validate();
			}
		});
		componentListener.setListenerComponent(this);
		browserWindow.addComponentListener(componentListener);
	});
	jsuis.Object.addProperties(jsuis.defaultlf.Frame, {
		rootPane: null
	});
	jsuis.defaultlf.Frame.prototype.add = function(component, constraints, index) {
		var contentPane = this.getContentPane();
		contentPane.add(component, constraints, index);
	}
	jsuis.defaultlf.Frame.prototype.remove = function(component) {
		var contentPane = this.getContentPane();
		contentPane.remove(component);
	}
	jsuis.defaultlf.Frame.prototype.removeAll = function() {
		var contentPane = this.getContentPane();
		contentPane.removeAll();
	}
	jsuis.defaultlf.Frame.prototype.getLayeredPane = function() {
		var rootPane = this.getRootPane();
		return rootPane.getLayeredPane();
	}
	jsuis.defaultlf.Frame.prototype.setLayeredPane = function(contentPane) {
		var rootPane = this.getRootPane();
		rootPane.setLayeredPane(contentPane);
		return this;
	}
	jsuis.defaultlf.Frame.prototype.getMenuBar = function() {
		var rootPane = this.getRootPane();
		return rootPane.getMenuBar();
	}
	jsuis.defaultlf.Frame.prototype.setMenuBar = function(menuBar) {
		var rootPane = this.getRootPane();
		rootPane.setMenuBar(menuBar);
		return this;
	}
	jsuis.defaultlf.Frame.prototype.getContentPane = function() {
		var rootPane = this.getRootPane();
		return rootPane.getContentPane();
	}
	jsuis.defaultlf.Frame.prototype.setContentPane = function(contentPane) {
		var rootPane = this.getRootPane();
		rootPane.setContentPane(contentPane);
		return this;
	}
	jsuis.defaultlf.Frame.prototype.getLayout = function() {
		var contentPane = this.getContentPane();
		return contentPane.getLayout();
	}
	jsuis.defaultlf.Frame.prototype.setLayout = function(layout) {
		var contentPane = this.getContentPane();
		contentPane.setLayout(layout);
		return this;
	}
	jsuis.defaultlf.Frame.prototype.validate = function() {
		var parent = this.getParent();
		if (!parent) {
			return;
		}
		var parentElement = parent.getElement();
		var size = parent.getSize().subtract(
				parent.getInsets().getDimension()).subtract(
						parent.getOutsets().getDimension());
		var width = size.getWidth();
		if (width === 0) {
			width = parentElement.clientWidth;
		}
		var height = size.getHeight();
		if (height === 0) {
			height = parentElement.clientHeight;
		}
		this.setWidth(width);
		this.setHeight(height);
		SUPER.prototype.validate.call(this);
	}
	jsuis.defaultlf.Frame.prototype.doLayout = function() {
		var layout = SUPER.prototype.getLayout.call(this);
		if (layout) {
			layout.layoutContainer(this);
		}
	}
	jsuis.defaultlf.Frame.prototype.setVisible = function(visible) {
		SUPER.prototype.setVisible.call(this, visible);
		if (visible) {
			this.validate();
		}
		return this;
	}
	jsuis.defaultlf.Frame.prototype.getBackground = function() {
		var contentPane = this.getContentPane();
		return contentPane.getBackground();
	}
	jsuis.defaultlf.Frame.prototype.setBackground = function(background) {
		var contentPane = this.getContentPane();
		contentPane.setBackground(background);
		return this;
	}
	jsuis.defaultlf.Frame.prototype.dispose = function() {
		var browserWindow = jsuis.defaultlf.BrowserWindow.getInstance();
		var browserWindowComponentListeners = browserWindow.getComponentListeners();
		for (var i = 0; i < browserWindowComponentListeners.length; i++) {
			var browserWindowComponentListener = browserWindowComponentListeners[i];
			if (browserWindowComponentListener.getListenerComponent() === this) {
				browserWindow.removeComponentListener(browserWindowComponentListener);
			}
		}
	}
}) (jsuis);
