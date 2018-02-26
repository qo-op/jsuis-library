/**
 * jsuis.defaultlf.TextField
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Panel;
	jsuis.defaultlf.TextField = jsuis.Object.extend(SUPER, function(text) {
		SUPER.prototype.constructor.call(this, new jsuis.BorderLayout());
		var label = new jsuis.defaultlf.Label(text);
		this.setLabel(label);
		this.add(label, new jsuis.BorderConstraints().setFill(jsuis.Constants.HORIZONTAL));
		this.setPadding(new jsuis.Insets(2, 4));
		this.setBackground(jsuis.Color.Black.withAlpha(0));
		this.setFont(new jsuis.Font("Arial", "normal", 12));
		var mouseListener = new jsuis.MouseListener({
			mouseReleased: function(event) {
				var source = event.getSource();
				var textFieldEditor = jsuis.defaultlf.TextFieldEditor.getInstance();
				source.setEditor(textFieldEditor);
				textFieldEditor.requestFocus();
			}
		});
		this.addMouseListener(mouseListener);
	});
	jsuis.Object.addProperties(jsuis.defaultlf.TextField, {
		label: null,
		editor: null
	});
	jsuis.defaultlf.TextField.prototype.setEditor = function(editor) {
		if (editor) {
			editor.install(this);
		}
		this.editor = editor;
		return this;
	}
	jsuis.defaultlf.TextField.prototype.getText = function() {
		var label = this.getLabel();
		return label.getText();
	}
	jsuis.defaultlf.TextField.prototype.getFont = function() {
		var label = this.getLabel();
		return label.getFont();
	}
	jsuis.defaultlf.TextField.prototype.setFont = function(font) {
		var label = this.getLabel();
		label.setFont(font);
		return this;
	}
}) (jsuis);
