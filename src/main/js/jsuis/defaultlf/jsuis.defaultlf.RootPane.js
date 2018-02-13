/**
 * jsuis.defaultlf.RootPane
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.LayeredPane;
	jsuis.defaultlf.RootPane = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this);
		this.setLayout(new jsuis.BorderLayout());
	});
	jsuis.Object.addProperties(jsuis.defaultlf.RootPane,
			new jsuis.Property("contentPane")
	);
	jsuis.defaultlf.RootPane.prototype.setContentPane = function(contentPane) {
		var oldContentPane = this.getContentPane();
		if (oldContentPane) {
			this.remove(oldContentPane);
		}
		this.add(contentPane, jsuis.Constants.FRAME_CONTENT_LAYER);
		this.contentPane = contentPane;
		return this;
	}
}) (jsuis);
