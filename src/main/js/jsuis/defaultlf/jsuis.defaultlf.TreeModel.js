/**
 * jsuis.defaultlf.TreeModel
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.defaultlf.TreeModel = jsuis.Object.extend(SUPER, function(root) {
		SUPER.prototype.constructor.call(this);
		this.setRoot(root);
	});
	jsuis.Object.addProperties(jsuis.defaultlf.TreeModel,
			new jsuis.Property("root"),
			new jsuis.Property("rows")
	);
	jsuis.defaultlf.TreeModel.prototype.setRoot = function(root) {
		this.setRows(null);
		this.root = root;
		return this;
	}
	jsuis.defaultlf.TreeModel.prototype.getRows = function() {
		var rows = this.rows;
		if (!rows) {
			rows = [];
			this.setRows(rows);
			var root = this.getRoot();
			if (root) {
				this.load(root);
			}
		}
		return rows;
	}
	jsuis.defaultlf.TreeModel.prototype.load = function(node) {
		var rows = this.getRows();
		rows.push(node);
		var children = node.getChildren();
		if (children) {
			for (var i = 0; i < children.length; i++) {
				var child = children[i];
				this.load(child);
			}
		}
	}
}) (jsuis);
