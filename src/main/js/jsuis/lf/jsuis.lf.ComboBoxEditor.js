/**
 * jsuis.lf.ComboBoxEditor
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Component;
	jsuis.lf.ComboBoxEditor = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this, document.createElement("select"));
		this.setStyleProperty("position", "absolute");
		this.setStyleProperty("padding", "0");
		this.setStyleProperty("margin", "0");
		this.setStyleProperty("border", "0");
		this.setStyleProperty("outline", "none");
		this.setStyleProperty("background-color", "transparent");
		this.setVisible(false);
		new jsuis.lf.Component(document.body).add(this);
		var actionListener = new jsuis.ActionListener({
			actionPerformed: function(event) {
				var comboBoxEditor = this.getListenerComponent();
				var comboBox = comboBoxEditor.getComboBox();
				if (comboBox) {
					comboBox.setSelectedItem(comboBoxEditor.getSelectedItem());
					comboBox.fireActionPerformed(event.getElement());
				}
			}
		});
		actionListener.setListenerComponent(this);
		this.addActionListener(actionListener);
		var focusListener = new jsuis.FocusListener({
			focusLost: function(event) {
				var comboBoxEditor = this.getListenerComponent();
				var comboBox = comboBoxEditor.getComboBox();
				if (comboBox) {
					comboBoxEditor.uninstall(comboBox);
				}
			}
		});
		focusListener.setListenerComponent(this);
		this.addFocusListener(focusListener);
	});
	jsuis.Object.addProperties(jsuis.lf.ComboBoxEditor, {
		comboBox: null,
		selection: null,
		enterSelection: null,
		values: null,
		target: null
	});
	var instance;
	jsuis.lf.ComboBoxEditor.getInstance = function() {
		if (!instance) {
			instance = new jsuis.lf.ComboBoxEditor();
		}
		return instance;
	}
	jsuis.lf.ComboBoxEditor.prototype.install = function(comboBox) {
		var oldComboBox = this.getComboBox();
		if (oldComboBox) {
			this.uninstall(oldComboBox);
		}
		if (comboBox) {
			var label = comboBox.getLabel();
			var labelBoundingClientRect = label.getElement().getBoundingClientRect();
			var comboBoxBoundingClientRect = comboBox.getElement().getBoundingClientRect();
			var bodyBoundingClientRect = document.body.getBoundingClientRect();
			var dx = labelBoundingClientRect.left - comboBoxBoundingClientRect.left;
			var dy = labelBoundingClientRect.top - comboBoxBoundingClientRect.top;
			this.setBounds(new jsuis.Rectangle(
					labelBoundingClientRect.left - bodyBoundingClientRect.left, labelBoundingClientRect.top - bodyBoundingClientRect.top - dy,
					comboBoxBoundingClientRect.width - 2 * dx, labelBoundingClientRect.height + 2 * dy));
			this.setFont(label.getFont());
			this.setItems(comboBox.getItems());
			this.setSelectedItem(comboBox.getSelectedItem());
			label.setVisible(false);
			this.setVisible(true);
		}
		this.setComboBox(comboBox);
		return this;
	}
	jsuis.lf.ComboBoxEditor.prototype.uninstall = function(comboBox) {
		comboBox.setSelectedItem(this.getSelectedItem());
		this.setVisible(false);
		var label = comboBox.getLabel();
		label.setVisible(true);
		comboBox.setEditor(null);
	}
	jsuis.lf.ComboBoxEditor.prototype.setItems = function(items) {
		this
			.select()
			.data(items)
			.enter().append()
			.all()
				.text(function(d) { return d; })
			.exit().remove();
		return this;
	}
	jsuis.lf.ComboBoxEditor.prototype.getSelectedItem = function() {
		var element = this.getElement();
		return element.value;
	}
	jsuis.lf.ComboBoxEditor.prototype.setSelectedItem = function(item) {
		var element = this.getElement();
		element.selectedIndex = this.getValues().indexOf(item);
		return this;
	}
	jsuis.lf.ComboBoxEditor.prototype.setX = function(x) {
		this.x = x;
		/*
		var outsets = this.getOutsets();
		this.setStyleProperty("left", (+nvl(x, 0) + outsets.getLeft()) + "px");
		*/
		this.setStyleProperty("left", +nvl(x, 0) + "px");
		return this;
	}
	jsuis.lf.ComboBoxEditor.prototype.setY = function(y) {
		this.y = y;
		/*
		var outsets = this.getOutsets();
		this.setStyleProperty("top", (+nvl(y, 0) + outsets.getTop()) + "px");
		*/
		this.setStyleProperty("top", +nvl(y, 0) + "px");
		return this;
	}
	jsuis.lf.ComboBoxEditor.prototype.setWidth = function(width) {
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
	jsuis.lf.ComboBoxEditor.prototype.setHeight = function(height) {
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
	jsuis.lf.ComboBoxEditor.prototype.select = function() {
		this.setSelection(this.getComponents());
		this.setEnterSelection([]);
		return this;
	}
	jsuis.lf.ComboBoxEditor.prototype.data = function(data) {
		this.setValues(data);
		this.update();
		return this;
	}
	jsuis.lf.ComboBoxEditor.prototype.update = function() {
		this.setTarget("update");
		return this;
	}
	jsuis.lf.ComboBoxEditor.prototype.enter = function() {
		this.setTarget("enter");
		return this;
	}
	jsuis.lf.ComboBoxEditor.prototype.exit = function() {
		this.setTarget("exit");
		return this;
	}
	jsuis.lf.ComboBoxEditor.prototype.all = function() {
		this.setTarget("all");
		return this;
	}
	jsuis.lf.ComboBoxEditor.prototype.append = function() {
		var selection = this.getSelection();
		var data = this.getValues();
		var target = this.getTarget();
		switch (target) {
		case "enter":
			var enterSelection = this.getEnterSelection();
			for (var i = selection.length; i < data.length; i++) {
				var component = new jsuis.lf.Option();
				enterSelection.push(component);
				this.add(component);
			}
			break;
		case "exit":
			break;
		case "update":
		default:
		}
		return this;
	}
	jsuis.lf.ComboBoxEditor.prototype.remove = function() {
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
	jsuis.lf.ComboBoxEditor.prototype.text = function(text) {
		var selection = this.getSelection();
		var data = this.getValues();
		var target = this.getTarget();
		switch (target) {
		case "enter":
			var enterSelection = this.getEnterSelection();
			for (var i = selection.length; i < data.length; i++) {
				var component = enterSelection[i - selection.length];
				var element = component.getElement();
				if (jsuis.Object.isFunction(text)) {
					element.innerHTML = text(data[i], i);
				} else {
					element.innerHTML = text;
				}
			}
			break;
		case "exit":
			for (var i = data.length; i < selection.length; i++) {
				var component = selection[i];
				var element = component.getElement();
				if (jsuis.Object.isFunction(text)) {
					element.innerHTML = text(data[i], i);
				} else {
					element.innerHTML = text;
				}
			}
			break;
		case "all":
			for (var i = 0; i < Math.min(selection.length, data.length); i++) {
				var component = selection[i];
				var element = component.getElement();
				if (jsuis.Object.isFunction(text)) {
					element.innerHTML = text(data[i], i);
				} else {
					element.innerHTML = text;
				}
			}
			var enterSelection = this.getEnterSelection();
			for (var i = selection.length; i < data.length; i++) {
				var component = enterSelection[i - selection.length];
				var element = component.getElement();
				if (jsuis.Object.isFunction(text)) {
					element.innerHTML = text(data[i], i);
				} else {
					element.innerHTML = text;
				}
			}
			break;
		case "update":
		default:
			for (var i = 0; i < Math.min(selection.length, data.length); i++) {
				var component = selection[i];
				var element = component.getElement();
				if (jsuis.Object.isFunction(text)) {
					element.innerHTML = text(data[i], i);
				} else {
					element.innerHTML = text;
				}
			}
		}
		return this;
	}
	jsuis.lf.ComboBoxEditor.prototype.addActionListener = function(actionListener) {
		var actionListeners = this.getActionListeners();
		actionListeners.push(actionListener);
		var component = this;
		var listener = actionListener.getListener();
		if (listener.actionPerformed) {
			var onchange = this.getEventListener("change");
			if (!onchange) {
				this.setEventListener("change", function(event) {
					component.fireActionPerformed(event);
				});
			}
		}
	}
}) (jsuis);
