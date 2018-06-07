/**
 * jsuis.defaultlf.TableCell
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Panel;
	jsuis.defaultlf.TableCell = jsuis.Object.extend(SUPER, function(text) {
		SUPER.prototype.constructor.call(this, new jsuis.BorderLayout());
		var label = new jsuis.defaultlf.Text(text);
		this.setLabel(label);
		this.add(label, new jsuis.BorderConstraints().setFill(jsuis.Constants.HORIZONTAL));
		this.setPadding(new jsuis.Insets(2, 4));
		this.setBackground(jsuis.Color.Black.withAlpha(0));
		this.setFont(new jsuis.Font("Arial", "normal", 12));
		var mouseListener = new jsuis.MouseListener({
			mouseReleased: function(event) {
				var tableCell = this.getListenerComponent();
				var tableCellEditor = jsuis.defaultlf.TableCellEditor.getInstance();
				tableCell.setEditor(tableCellEditor);
				tableCellEditor.requestFocus();
			}
		});
		mouseListener.setListenerComponent(this);
		this.addMouseListener(mouseListener);
	});
	jsuis.Object.addProperties(jsuis.defaultlf.TableCell, {
		editor: null,
		label: null
	});
	jsuis.defaultlf.TableCell.prototype.setEditor = function(editor) {
		if (editor) {
			editor.install(this);
		}
		this.editor = editor;
		return this;
	}
	jsuis.defaultlf.TableCell.prototype.getText = function() {
		var label = this.getLabel();
		return label.getText();
	}
	jsuis.defaultlf.TableCell.prototype.setText = function(text) {
		var label = this.getLabel();
		return label.setText(text);
	}
	jsuis.defaultlf.TableCell.prototype.getFont = function() {
		var label = this.getLabel();
		return label.getFont();
	}
	jsuis.defaultlf.TableCell.prototype.setFont = function(font) {
		var label = this.getLabel();
		label.setFont(font);
		return this;
	}
}) (jsuis);
