/**
 * jsuis.lf.TextField
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Svg;
	jsuis.lf.TextField = jsuis.Object.extend(SUPER, function(text) {
		SUPER.prototype.constructor.call(this, new jsuis.BorderLayout());
		var label = new jsuis.lf.Text(text);
		this.setLabel(label);
		this.add(label, new jsuis.BorderConstraints().setFill(jsuis.Constants.HORIZONTAL));
		this.setPadding(new jsuis.Insets(2, 4));
		this.setBackground(jsuis.Color.Black.withAlpha(0));
		this.setFont(new jsuis.Font("Arial", "normal", 12));
		var mouseListener = new jsuis.MouseListener({
			mouseReleased: function(event) {
				var textField = this.getListenerComponent();
				var textFieldEditor = jsuis.lf.TextFieldEditor.getInstance();
				textField.setEditor(textFieldEditor);
				textFieldEditor.requestFocus();
			}
		});
		mouseListener.setListenerComponent(this);
		this.addMouseListener(mouseListener);
	});
	jsuis.Object.addProperties(jsuis.lf.TextField, {
		editor: null,
		label: null
	});
	jsuis.lf.TextField.prototype.setEditor = function(editor) {
		if (editor) {
			editor.install(this);
		}
		this.editor = editor;
		return this;
	}
	jsuis.lf.TextField.prototype.getText = function() {
		var label = this.getLabel();
		return label.getText();
	}
	jsuis.lf.TextField.prototype.setText = function(text) {
		var label = this.getLabel();
		return label.setText(text);
	}
	jsuis.lf.TextField.prototype.getFont = function() {
		var label = this.getLabel();
		return label.getFont();
	}
	jsuis.lf.TextField.prototype.setFont = function(font) {
		var label = this.getLabel();
		label.setFont(font);
		return this;
	}
}) (jsuis);
