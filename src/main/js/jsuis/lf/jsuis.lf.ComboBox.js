/**
 * jsuis.lf.ComboBox
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Svg;
	jsuis.lf.ComboBox = jsuis.Object.extend(SUPER, function(items) {
		SUPER.prototype.constructor.call(this, new jsuis.BorderLayout());
		this.setBorder(new jsuis.LineBorder(jsuis.Color.Gray, 1, 8));
		var label = new jsuis.lf.Text();
		this.setLabel(label);
		this.add(label, new jsuis.BorderConstraints().setFill(jsuis.Constants.HORIZONTAL));
		if (items) {
			this.setItems(items);
		}
		this.setPadding(new jsuis.Insets(2, 4));
		this.setBackground(jsuis.Color.Black.withAlpha(0));
		this.setFont(new jsuis.Font("Arial", "normal", 12));
		var mouseListener = new jsuis.MouseListener({
			mouseReleased: function(event) {
				var comboBox = this.getListenerComponent();
				var comboBoxEditor = jsuis.lf.ComboBoxEditor.getInstance();
				comboBox.setEditor(comboBoxEditor);
				comboBoxEditor.requestFocus();
			}
		});
		mouseListener.setListenerComponent(this);
		this.addMouseListener(mouseListener);
	});
	jsuis.Object.addProperties(jsuis.lf.ComboBox, {
		editor: null,
		items: null,
		label: null
	});
	jsuis.lf.ComboBox.prototype.setEditor = function(editor) {
		if (editor) {
			editor.install(this);
		}
		this.editor = editor;
		return this;
	}
	jsuis.lf.ComboBox.prototype.setItems = function(items) {
		this.items = items;
		this.setSelectedItem(items[0]);
	}
	jsuis.lf.ComboBox.prototype.getSelectedItem = function() {
		var label = this.getLabel();
		return label.getText();
	}
	jsuis.lf.ComboBox.prototype.setSelectedItem = function(text) {
		var label = this.getLabel();
		return label.setText(text);
	}
	jsuis.lf.ComboBox.prototype.getFont = function() {
		var label = this.getLabel();
		return label.getFont();
	}
	jsuis.lf.ComboBox.prototype.setFont = function(font) {
		var label = this.getLabel();
		label.setFont(font);
		return this;
	}
}) (jsuis);
