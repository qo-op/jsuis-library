/**
 * jsuis.defaultlf.TextFieldEditor
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Component;
	jsuis.defaultlf.TextFieldEditor = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this, document.createElement("input"));
		this.setAttribute("type", "text");
		this.setStyleProperty("position", "absolute");
		this.setStyleProperty("padding", "0");
		this.setStyleProperty("margin", "0");
		this.setStyleProperty("border", "0");
		this.setStyleProperty("outline", "none");
		this.setStyleProperty("background-color", "transparent");
		this.setVisible(false);
		new jsuis.defaultlf.Component(document.body).add(this);
		
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
	jsuis.Object.addProperties(jsuis.defaultlf.TextFieldEditor, {
		textField: null
	});
	var instance;
	jsuis.defaultlf.TextFieldEditor.getInstance = function() {
		if (!instance) {
			instance = new jsuis.defaultlf.TextFieldEditor();
		}
		return instance;
	}
	jsuis.defaultlf.TextFieldEditor.prototype.install = function(textField) {
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
			label.setStyleProperty("visibility", "hidden");
			this.setVisible(true);
		}
		this.textField = textField;
		return this;
	}
	jsuis.defaultlf.TextFieldEditor.prototype.uninstall = function(textField) {
		var label = textField.getLabel();
		label.setText(this.getText());
		this.setVisible(false);
		label.setStyleProperty("visibility", "visible");
		textField.setEditor(null);
	}
	jsuis.defaultlf.TextFieldEditor.prototype.getText = function() {
		var element = this.getElement();
		return element.value;
	}
	jsuis.defaultlf.TextFieldEditor.prototype.setText = function(text) {
		var element = this.getElement();
		element.value = nvl(text, "");
		return this;
	}
	jsuis.defaultlf.TextFieldEditor.prototype.setX = function(x) {
		var outsets = this.getOutsets();
		this.setStyleProperty("left", (+nvl(x, 0) + outsets.getLeft()) + "px");
		this.x = x;
		return this;
	}
	jsuis.defaultlf.TextFieldEditor.prototype.setY = function(y) {
		var outsets = this.getOutsets();
		this.setStyleProperty("top", (+nvl(y, 0) + outsets.getTop()) + "px");
		this.y = y;
		return this;
	}
	jsuis.defaultlf.TextFieldEditor.prototype.setWidth = function(width) {
		var outsets = this.getOutsets();
		width -= outsets.getLeft() + outsets.getRight();
		if (width >= 0) {
			this.setStyleProperty("width", width + "px");
		}
		this.width = width;
		return this;
	}
	jsuis.defaultlf.TextFieldEditor.prototype.setHeight = function(height) {
		var outsets = this.getOutsets();
		height -= outsets.getTop() + outsets.getBottom();
		if (height >= 0) {
			this.setStyleProperty("height", height + "px");
		}
		this.height = height;
		return this;
	}
}) (jsuis);
