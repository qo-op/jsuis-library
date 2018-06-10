/**
 * jsuis.lf.Body
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Component;
	jsuis.lf.Body = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this, document.body);
		
		var browserWindow = jsuis.lf.BrowserWindow.getInstance();
		var componentListener = new jsuis.ComponentListener({
			componentResized: function(event) {
				var body = this.getListenerComponent();
				body.validate();
			}
		});
		componentListener.setListenerComponent(this);
		browserWindow.addComponentListener(componentListener);
	});
	var instance;
	jsuis.lf.Body.getInstance = function() {
		if (!instance) {
			instance = new jsuis.lf.Body();
		}
		return instance;
	}
	jsuis.lf.Body.prototype.validate = function() {
		var element = this.getElement();
		var width = element.clientWidth;
		var height = element.clientHeight;
		this.setWidth(width);
		this.setHeight(height);
		SUPER.prototype.validate.call(this);
	}
	jsuis.lf.Body.prototype.setVisible = function(visible) {
		SUPER.prototype.setVisible.call(this, visible);
		if (visible) {
			this.validate();
		}
		return this;
	}
}) (jsuis);
