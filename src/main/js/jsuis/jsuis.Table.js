/**
 * jsuis.Table
 */
(function(jsuis) {
	var SUPER = jsuis.Component;
	jsuis.Table = jsuis.Object.extend(SUPER, function() {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].Table());
	});
	jsuis.Object.addPeerProperties(jsuis.Table, {
		columns: null,
		rowCount: 0,
		columnCount: 0
	});
	jsuis.Table.prototype.getValueAt = function(row, column) {
		var peer = this.getPeer();
		return peer.getValueAt(row, column);
	}
	jsuis.Table.prototype.setValueAt = function(value, row, column) {
		var peer = this.getPeer();
		peer.setValueAt(value, row, column);
		return peer;
	}
}) (jsuis);
