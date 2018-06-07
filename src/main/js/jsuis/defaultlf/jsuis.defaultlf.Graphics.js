/**
 * jsuis.defaultlf.Graphics
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Container;
	jsuis.defaultlf.Graphics = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this);
		this.setElement(document.createElementNS(jsuis.Constants.SVG, "g"));
		this.setComponents([]);
		this.setSelection([]);
		this.setEnterSelection([]);
	});
	jsuis.Object.addProperties(jsuis.defaultlf.Graphics, {
		selection: null,
		enterSelection: null,
		values: null,
		target: null
	});
	jsuis.defaultlf.Graphics.prototype.select = function(constraints) {
		var selection = [];
		var components = this.getComponents();
		for (var i = 0; i < components.length; i++) {
			var component = components[i];
			var componentConstraints = component.getConstraints();
			if (componentConstraints === constraints) {
				selection.push(component);
			}
		}
		this.setSelection(selection);
		this.setEnterSelection([]);
		return this;
	}
	jsuis.defaultlf.Graphics.prototype.data = function(data) {
		this.setValues(data);
		this.update();
		return this;
	}
	jsuis.defaultlf.Graphics.prototype.update = function() {
		this.setTarget("update");
		return this;
	}
	jsuis.defaultlf.Graphics.prototype.enter = function() {
		this.setTarget("enter");
		return this;
	}
	jsuis.defaultlf.Graphics.prototype.exit = function() {
		this.setTarget("exit");
		return this;
	}
	jsuis.defaultlf.Graphics.prototype.all = function() {
		this.setTarget("all");
		return this;
	}
	jsuis.defaultlf.Graphics.prototype.append = function(element) {
		var selection = this.getSelection();
		var data = this.getValues();
		var target = this.getTarget();
		switch (target) {
		case "enter":
			var enterSelection = this.getEnterSelection();
			for (var i = selection.length; i < data.length; i++) {
				var component;
				switch (element) {
				case "image":
					component = new jsuis.defaultlf.Image();
					break;
				case "line":
					component = new jsuis.defaultlf.Line();
					break;
				case "rect":
					component = new jsuis.defaultlf.Rect();
					break;
				case "circle":
					component = new jsuis.defaultlf.Circle();
					break;
				case "path":
					component = new jsuis.defaultlf.Path();
					break;
				case "polygon":
					component = new jsuis.defaultlf.Polygon();
					break;
				case "polyline":
					component = new jsuis.defaultlf.Polyline();
					break;
				}
				enterSelection.push(component);
				this.add(component, element);
			}
			break;
		case "exit":
			break;
		case "update":
		default:
		}
		return this;
	}
	jsuis.defaultlf.Graphics.prototype.remove = function() {
		var selection = this.getSelection();
		var data = this.getValues();
		var target = this.getTarget();
		switch (target) {
		case "enter":
			break;
		case "exit":
			for (var i = data.length; i < selection.length; i++) {
				var component = selection[i];
				this.remove(component);
			}
			break;
		case "update":
		default:
		}
	}
	jsuis.defaultlf.Graphics.prototype.setAttribute = function(attribute, value) {
		var selection = this.getSelection();
		var data = this.getValues();
		var target = this.getTarget();
		switch (target) {
		case "enter":
			var enterSelection = this.getEnterSelection();
			for (var i = selection.length; i < data.length; i++) {
				var component = enterSelection[i - selection.length];
				if (jsuis.Object.isFunction(value)) {
					component.setAttribute(attribute, value(data[i], i));
				} else {
					component.setAttribute(attribute, value);
				}
			}
			break;
		case "exit":
			for (var i = data.length; i < selection.length; i++) {
				var component = selection[i];
				if (jsuis.Object.isFunction(value)) {
					component.setAttribute(attribute, value(data[i], i));
				} else {
					component.setAttribute(attribute, value);
				}
			}
			break;
		case "all":
			for (var i = 0; i < Math.min(selection.length, data.length); i++) {
				var component = selection[i];
				if (jsuis.Object.isFunction(value)) {
					component.setAttribute(attribute, value(data[i], i));
				} else {
					component.setAttribute(attribute, value);
				}
			}
			var enterSelection = this.getEnterSelection();
			for (var i = selection.length; i < data.length; i++) {
				var component = enterSelection[i - selection.length];
				if (jsuis.Object.isFunction(value)) {
					component.setAttribute(attribute, value(data[i], i));
				} else {
					component.setAttribute(attribute, value);
				}
			}
			break;
		case "update":
		default:
			for (var i = 0; i < Math.min(selection.length, data.length); i++) {
				var component = selection[i];
				if (jsuis.Object.isFunction(value)) {
					component.setAttribute(attribute, value(data[i], i));
				} else {
					component.setAttribute(attribute, value);
				}
			}
		}
		return this;
	}
	jsuis.defaultlf.Graphics.prototype.setStyleProperty = function(attribute, value) {
		var selection = this.getSelection();
		var data = this.getValues();
		var target = this.getTarget();
		switch (target) {
		case "enter":
			var enterSelection = this.getEnterSelection();
			for (var i = selection.length; i < data.length; i++) {
				var component = enterSelection[i - selection.length];
				if (jsuis.Object.isFunction(value)) {
					component.setStyleProperty(attribute, value(data[i], i));
				} else {
					component.setStyleProperty(attribute, value);
				}
			}
			break;
		case "exit":
			for (var i = data.length; i < selection.length; i++) {
				var component = selection[i];
				if (jsuis.Object.isFunction(value)) {
					component.setStyleProperty(attribute, value(data[i], i));
				} else {
					component.setStyleProperty(attribute, value);
				}
			}
			break;
		case "all":
			for (var i = 0; i < Math.min(selection.length, data.length); i++) {
				var component = selection[i];
				if (jsuis.Object.isFunction(value)) {
					component.setStyleProperty(attribute, value(data[i], i));
				} else {
					component.setStyleProperty(attribute, value);
				}
			}
			var enterSelection = this.getEnterSelection();
			for (var i = selection.length; i < data.length; i++) {
				var component = enterSelection[i - selection.length];
				if (jsuis.Object.isFunction(value)) {
					component.setStyleProperty(attribute, value(data[i], i));
				} else {
					component.setStyleProperty(attribute, value);
				}
			}
			break;
		case "update":
		default:
			for (var i = 0; i < Math.min(selection.length, data.length); i++) {
				var component = selection[i];
				if (jsuis.Object.isFunction(value)) {
					component.setStyleProperty(attribute, value(data[i], i));
				} else {
					component.setStyleProperty(attribute, value);
				}
			}
		}
		return this;
	}
	jsuis.defaultlf.Graphics.prototype.setAttributeNS = function(namespace, attribute, value) {
		var selection = this.getSelection();
		var data = this.getValues();
		var target = this.getTarget();
		switch (target) {
		case "enter":
			var enterSelection = this.getEnterSelection();
			for (var i = selection.length; i < data.length; i++) {
				var component = enterSelection[i - selection.length];
				if (jsuis.Object.isFunction(value)) {
					component.setAttributeNS(namespace, attribute, value(data[i], i));
				} else {
					component.setAttributeNS(namespace, attribute, value);
				}
			}
			break;
		case "exit":
			for (var i = data.length; i < selection.length; i++) {
				var component = selection[i];
				if (jsuis.Object.isFunction(value)) {
					component.setAttributeNS(namespace, attribute, value(data[i], i));
				} else {
					component.setAttributeNS(namespace, attribute, value);
				}
			}
			break;
		case "all":
			for (var i = 0; i < Math.min(selection.length, data.length); i++) {
				var component = selection[i];
				if (jsuis.Object.isFunction(value)) {
					component.setAttributeNS(namespace, attribute, value(data[i], i));
				} else {
					component.setAttributeNS(namespace, attribute, value);
				}
			}
			var enterSelection = this.getEnterSelection();
			for (var i = selection.length; i < data.length; i++) {
				var component = enterSelection[i - selection.length];
				if (jsuis.Object.isFunction(value)) {
					component.setAttributeNS(namespace, attribute, value(data[i], i));
				} else {
					component.setAttributeNS(namespace, attribute, value);
				}
			}
			break;
		case "update":
		default:
			for (var i = 0; i < Math.min(selection.length, data.length); i++) {
				var component = selection[i];
				if (jsuis.Object.isFunction(value)) {
					component.setAttributeNS(namespace, attribute, value(data[i], i));
				} else {
					component.setAttributeNS(namespace, attribute, value);
				}
			}
		}
		return this;
	}
}) (jsuis);
