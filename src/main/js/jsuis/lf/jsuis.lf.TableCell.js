/**
 * jsuis.lf.TableCell
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Graphics;
	jsuis.lf.TableCell = jsuis.Object.extend(SUPER, function(text) {
		SUPER.prototype.constructor.call(this, new jsuis.BorderLayout());
		var label = new jsuis.lf.Text(text);
		this.setLabel(label);
		this.add(label, new jsuis.BorderConstraints().setFill(jsuis.Constants.HORIZONTAL));
		this.setPadding(new jsuis.Insets(2, 4));
		this.setBackground(jsuis.Color.Black.withAlpha(0));
		this.setFont(new jsuis.Font("Arial", "normal", 12));
		var mouseListener = new jsuis.MouseListener({
			mouseReleased: function(event) {
				var tableCell = this.getListenerComponent();
				var tableCellEditor = jsuis.lf.TableCellEditor.getInstance();
				tableCell.setEditor(tableCellEditor);
				tableCellEditor.requestFocus();
			}
		});
		mouseListener.setListenerComponent(this);
		this.addMouseListener(mouseListener);
	});
	jsuis.Object.addProperties(jsuis.lf.TableCell, {
		editor: null,
		label: null
	});
	jsuis.lf.TableCell.prototype.setEditor = function(editor) {
		if (editor) {
			editor.install(this);
		}
		this.editor = editor;
		return this;
	}
	jsuis.lf.TableCell.prototype.getText = function() {
		var label = this.getLabel();
		return label.getText();
	}
	jsuis.lf.TableCell.prototype.setText = function(text) {
		var label = this.getLabel();
		return label.setText(text);
	}
	jsuis.lf.TableCell.prototype.getFont = function() {
		var label = this.getLabel();
		return label.getFont();
	}
	jsuis.lf.TableCell.prototype.setFont = function(font) {
		var label = this.getLabel();
		label.setFont(font);
		return this;
	}
}) (jsuis);
