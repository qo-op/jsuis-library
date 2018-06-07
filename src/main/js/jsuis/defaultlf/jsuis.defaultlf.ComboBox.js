/**
 * jsuis.defaultlf.ComboBox
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Panel;
	jsuis.defaultlf.ComboBox = jsuis.Object.extend(SUPER, function(items) {
		SUPER.prototype.constructor.call(this, new jsuis.BorderLayout());
		this.setBorder(new jsuis.LineBorder(jsuis.Color.Gray, 1, 8));
		var label = new jsuis.defaultlf.Text();
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
				var comboBoxEditor = jsuis.defaultlf.ComboBoxEditor.getInstance();
				comboBox.setEditor(comboBoxEditor);
				comboBoxEditor.requestFocus();
			}
		});
		mouseListener.setListenerComponent(this);
		this.addMouseListener(mouseListener);
	});
	jsuis.Object.addProperties(jsuis.defaultlf.ComboBox, {
		editor: null,
		items: null,
		label: null
	});
	jsuis.defaultlf.ComboBox.prototype.setEditor = function(editor) {
		if (editor) {
			editor.install(this);
		}
		this.editor = editor;
		return this;
	}
	jsuis.defaultlf.ComboBox.prototype.setItems = function(items) {
		this.items = items;
		this.setSelectedItem(items[0]);
	}
	jsuis.defaultlf.ComboBox.prototype.getSelectedItem = function() {
		var label = this.getLabel();
		return label.getText();
	}
	jsuis.defaultlf.ComboBox.prototype.setSelectedItem = function(text) {
		var label = this.getLabel();
		return label.setText(text);
	}
	jsuis.defaultlf.ComboBox.prototype.getFont = function() {
		var label = this.getLabel();
		return label.getFont();
	}
	jsuis.defaultlf.ComboBox.prototype.setFont = function(font) {
		var label = this.getLabel();
		label.setFont(font);
		return this;
	}
}) (jsuis);
