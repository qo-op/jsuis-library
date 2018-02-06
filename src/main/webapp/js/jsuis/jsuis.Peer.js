/**
 * jsuis.Peer
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.Peer = jsuis.Object.extend(SUPER, function() {
	});
	jsuis.Peer.prototype.getPeer = function() {
		return this.peer;
	}
	jsuis.Peer.prototype.setPeer = function(peer) {
		this.peer = peer;
		return this;
	}
}) (jsuis);
