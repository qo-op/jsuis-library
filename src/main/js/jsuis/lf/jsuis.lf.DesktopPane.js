/**
 * jsuis.lf.DesktopPane
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Container;
	jsuis.lf.DesktopPane = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this, document.body);
		
		var browserWindow = jsuis.lf.BrowserWindow.getInstance();
		var componentListener = new jsuis.ComponentListener({
			componentResized: function(event) {
				var desktopPane = this.getListenerComponent();
				desktopPane.validate();
			}
		});
		componentListener.setListenerComponent(this);
		browserWindow.addComponentListener(componentListener);
	});
	var instance;
	jsuis.lf.DesktopPane.getInstance = function() {
		if (!instance) {
			instance = new jsuis.lf.DesktopPane();
		}
		return instance;
	}
	jsuis.Object.addProperties(jsuis.lf.DesktopPane, {
		width: 0,
		height: 0
	});
	jsuis.lf.DesktopPane.prototype.validate = function() {
		var element = this.getElement();
		var width = element.clientWidth;
		var height = element.clientHeight;
		this.setWidth(width);
		this.setHeight(height);
		SUPER.prototype.validate.call(this);
	}
	jsuis.lf.DesktopPane.prototype.setVisible = function(visible) {
		SUPER.prototype.setVisible.call(this, visible);
		if (visible) {
			this.validate();
		}
		return this;
	}
}) (jsuis);
