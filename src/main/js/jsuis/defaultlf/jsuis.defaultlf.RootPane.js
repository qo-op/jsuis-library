/**
 * jsuis.defaultlf.RootPane
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.LayeredPane;
	jsuis.defaultlf.RootPane = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this);
		var layeredPane = new jsuis.defaultlf.LayeredPane();
		this.setLayeredPane(layeredPane);
		this.add(layeredPane);
	});
	jsuis.Object.addProperties(jsuis.defaultlf.RootPane, {
		layeredPane: null,
		menuBar: null,
		contentPane: null
	});
	jsuis.defaultlf.RootPane.prototype.setMenuBar = function(menuBar) {
		var layeredPane = this.getLayeredPane();
		var oldMenuBar = this.getMenuBar();
		if (oldMenuBar) {
			layeredPane.remove(oldMenuBar);
		}
		layeredPane.add(menuBar, jsuis.Constraints.FRAME_CONTENT_LAYER);
		this.menuBar = menuBar;
		return this;
	}
	jsuis.defaultlf.RootPane.prototype.setContentPane = function(contentPane) {
		var layeredPane = this.getLayeredPane();
		var oldContentPane = this.getContentPane();
		if (oldContentPane) {
			layeredPane.remove(oldContentPane);
		}
		layeredPane.add(contentPane, jsuis.Constraints.FRAME_CONTENT_LAYER);
		this.contentPane = contentPane;
		return this;
	}
	// TODO RootPaneLayout
	jsuis.defaultlf.RootPane.prototype.doLayout = function() {
		var size = this.getSize();
		var insetsOutsets = this.getInsets().add(this.getOutsets());
		size = size.subtract(insetsOutsets.getDimension());
		var layerePane = this.getLayeredPane();
		layerePane.setSize(size);
		var menuBar = this.getMenuBar();
		var contentPane = this.getContentPane();
		var x = insetsOutsets.getLeft();
		var y = insetsOutsets.getTop();
		var width = size.getWidth();
		var height = size.getHeight();
		if (menuBar) {
			var menuBarPreferredSize = menuBar.getPreferredSize();
			var menuBarPreferredHeight = menuBarPreferredSize.getHeight();
			menuBar.setBounds(new jsuis.Rectangle(x, y, width, menuBarPreferredHeight));
			y += menuBarPreferredHeight;
			height -= menuBarPreferredHeight;
		}
		if (contentPane) {
			contentPane.setBounds(new jsuis.Rectangle(x, y, width, height));
		}
	}
}) (jsuis);
