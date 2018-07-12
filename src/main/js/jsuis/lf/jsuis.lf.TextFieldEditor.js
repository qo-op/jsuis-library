/**
 * jsuis.lf.TextFieldEditor
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Component;
	jsuis.lf.TextFieldEditor = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this, document.createElement("input"));
		this.setAttribute("type", "text");
		this.setStyleProperty("position", "absolute");
		this.setStyleProperty("padding", "0");
		this.setStyleProperty("margin", "0");
		this.setStyleProperty("border", "0");
		this.setStyleProperty("outline", "none");
		this.setStyleProperty("background-color", "transparent");
		this.setVisible(false);
		new jsuis.lf.Component(document.body).add(this);
		var focusListener = new jsuis.FocusListener({
			focusLost: function(event) {
				var textFieldEditor = this.getListenerComponent();
				var textField = textFieldEditor.getTextField();
				if (textField) {
					textFieldEditor.uninstall(textField);
				}
			}
		});
		focusListener.setListenerComponent(this);
		this.addFocusListener(focusListener);
	});
	jsuis.Object.addProperties(jsuis.lf.TextFieldEditor, {
		textField: null
	});
	var instance;
	jsuis.lf.TextFieldEditor.getInstance = function() {
		if (!instance) {
			instance = new jsuis.lf.TextFieldEditor();
		}
		return instance;
	}
	jsuis.lf.TextFieldEditor.prototype.install = function(textField) {
		var oldTextField = this.getTextField();
		if (oldTextField) {
			this.uninstall(oldTextField);
		}
		if (textField) {
			var label = textField.getLabel();
			var labelBoundingClientRect = label.getElement().getBoundingClientRect();
			var textFieldBoundingClientRect = textField.getElement().getBoundingClientRect();
			var bodyBoundingClientRect = document.body.getBoundingClientRect();
			var dx = labelBoundingClientRect.left - textFieldBoundingClientRect.left;
			var dy = labelBoundingClientRect.top - textFieldBoundingClientRect.top;
			this.setBounds(new jsuis.Rectangle(
					labelBoundingClientRect.left - bodyBoundingClientRect.left, labelBoundingClientRect.top - bodyBoundingClientRect.top - dy,
					textFieldBoundingClientRect.width - 2 * dx, labelBoundingClientRect.height + 2 * dy));
			this.setFont(label.getFont());
			this.setText(label.getText());
			label.setVisible(false);
			this.setVisible(true);
		}
		this.textField = textField;
		return this;
	}
	jsuis.lf.TextFieldEditor.prototype.uninstall = function(textField) {
		textField.setText(this.getText());
		this.setVisible(false);
		var label = textField.getLabel();
		label.setVisible(true);
		textField.setEditor(null);
	}
	jsuis.lf.TextFieldEditor.prototype.getText = function() {
		var element = this.getElement();
		return element.value;
	}
	jsuis.lf.TextFieldEditor.prototype.setText = function(text) {
		var element = this.getElement();
		element.value = nvl(text, "");
		return this;
	}
	jsuis.lf.TextFieldEditor.prototype.setX = function(x) {
		this.x = x;
		/*
		var outsets = this.getOutsets();
		this.setStyleProperty("left", (+nvl(x, 0) + outsets.getLeft()) + "px");
		*/
		this.setStyleProperty("left", +nvl(x, 0) + "px");
		return this;
	}
	jsuis.lf.TextFieldEditor.prototype.setY = function(y) {
		this.y = y;
		/*
		var outsets = this.getOutsets();
		this.setStyleProperty("top", (+nvl(y, 0) + outsets.getTop()) + "px");
		*/
		this.setStyleProperty("top", +nvl(y, 0) + "px");
		return this;
	}
	jsuis.lf.TextFieldEditor.prototype.setWidth = function(width) {
		this.width = width;
		/*
		var outsets = this.getOutsets();
		width -= outsets.getLeft() + outsets.getRight();
		*/
		if (width >= 0) {
			this.setStyleProperty("width", width + "px");
		}
		return this;
	}
	jsuis.lf.TextFieldEditor.prototype.setHeight = function(height) {
		this.height = height;
		/*
		var outsets = this.getOutsets();
		height -= outsets.getTop() + outsets.getBottom();
		*/
		if (height >= 0) {
			this.setStyleProperty("height", height + "px");
		}
		return this;
	}
}) (jsuis);
