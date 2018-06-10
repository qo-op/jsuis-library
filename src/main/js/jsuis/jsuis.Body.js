/**
 * jsuis.Body
 */
(function(jsuis) {
	var SUPER = jsuis.Component;
	jsuis.Body = jsuis.Object.extend(SUPER, function() {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].Body());
	});
	var instance;
	jsuis.Body.getInstance = function() {
		if (!instance) {
			instance = new jsuis.Body();
		}
		return instance;
	}
}) (jsuis);
