/**
 * jsuis.defaultlf.ScrollPane
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.LayeredPane;
	jsuis.defaultlf.ScrollPane = jsuis.Object.extend(SUPER, function(view, vsbPolicy, hsbPolicy) {
		SUPER.prototype.constructor.call(this);
		this.setLayout(new jsuis.BorderLayout());
		
		var viewport = new jsuis.defaultlf.Viewport();
		this.setViewport(viewport);
		this.add(viewport);
		
		if (view) {
			this.setViewportView(view);
		}
		vsbPolicy = nvl(vsbPolicy, jsuis.Constants.VERTICAL_SCROLLBAR_AS_NEEDED);
		this.setVsbPolicy(vsbPolicy);
		hsbPolicy = nvl(hsbPolicy, jsuis.Constants.HORIZONTAL_SCROLLBAR_AS_NEEDED);
		this.setHsbPolicy(hsbPolicy);
		
		var scrollBarPanel = new jsuis.defaultlf.Panel(new jsuis.GridBagLayout());
		this.setScrollBarPanel(scrollBarPanel);
		this.add(scrollBarPanel);
		
		var verticalScrollBar = new jsuis.defaultlf.ScrollBar(jsuis.Constants.VERTICAL);
		this.setVerticalScrollBar(verticalScrollBar);
		scrollBarPanel.add(verticalScrollBar, new jsuis.GridBagConstraints()
				.setGridx(1).setGridy(0).setWeighty(1)
				.setFill(jsuis.Constants.VERTICAL));
		if (vsbPolicy !== jsuis.Constants.VERTICAL_SCROLLBAR_ALWAYS) {
			verticalScrollBar.setVisible(false);
		}
		
		var horizontalScrollBar = new jsuis.defaultlf.ScrollBar(jsuis.Constants.HORIZONTAL);
		this.setHorizontalScrollBar(horizontalScrollBar);
		scrollBarPanel.add(horizontalScrollBar, new jsuis.GridBagConstraints()
				.setGridx(0).setGridy(1).setWeightx(1)
				.setFill(jsuis.Constants.HORIZONTAL));
		if (hsbPolicy !== jsuis.Constants.HORIZONTAL_SCROLLBAR_ALWAYS) {
			horizontalScrollBar.setVisible(false);
		}
		
		var central = new jsuis.defaultlf.Panel(null);
		scrollBarPanel.add(central, new jsuis.GridBagConstraints()
				.setGridx(0).setGridy(0).setWeightx(1).setWeighty(1)
				.setFill(jsuis.Constants.BOTH));
		
		var touchListener = new jsuis.TouchListener({
			touchPressed: function(event) {
				var scrollPane = this.getListenerComponent();
				var point = event.getPoint();
				scrollPane.setScrollThumbPressedPoint(point);
				event.stopPropagation();
			},
			touchMoved: function(event) {
				var scrollPane = this.getListenerComponent();
				var point = event.getPoint();
				var pressedPoint = scrollPane.getScrollThumbPressedPoint();
				var view = scrollPane.getViewportView();
				var verticalScrollBar = scrollPane.getVerticalScrollBar();
				var verticalScrollBarVisible = verticalScrollBar.isVisible();
				if (verticalScrollBarVisible) {
					var scrollTrack = verticalScrollBar.getScrollTrack();
					var scrollThumb = verticalScrollBar.getScrollThumb();
					var extent = verticalScrollBar.getExtent();
					var maximum = verticalScrollBar.getMaximum();
					var dy = point.getY() - pressedPoint.getY();
					var value = Math.min(Math.max(verticalScrollBar.getValue() - dy, 0), maximum - extent);
					verticalScrollBar.setValue(value);
					var maximumY = scrollTrack.getHeight() - scrollThumb.getHeight();
					if (maximum > extent) {
						scrollThumb.setY(value * maximumY / (maximum - extent));
					}
				}
				var horizontalScrollBar = scrollPane.getHorizontalScrollBar();
				var horizontalScrollBarVisible = horizontalScrollBar.isVisible();
				if (horizontalScrollBarVisible) {
					var scrollTrack = horizontalScrollBar.getScrollTrack();
					var scrollThumb = horizontalScrollBar.getScrollThumb();
					var extent = horizontalScrollBar.getExtent();
					var maximum = horizontalScrollBar.getMaximum();
					var dx = point.getX() - pressedPoint.getX();
					var value = Math.min(Math.max(horizontalScrollBar.getValue() - dx, 0), maximum - extent);
					horizontalScrollBar.setValue(value);
					var maximumX = scrollTrack.getWidth() - scrollThumb.getWidth();
					if (maximum > extent) {
						scrollThumb.setX(value * maximumX / (maximum - extent));
					}
				}
				event.preventDefault();
				event.stopPropagation();
			}
		});
		touchListener.setListenerComponent(this);
		viewport.addTouchListener(touchListener);
		
		verticalScrollBar.addPropertyChangeListener(new jsuis.PropertyChangeListener({
			propertyChange: function(event) {
				var newValue = event.getNewValue();
				var scrollPane = this.getListenerComponent();
				var viewport = scrollPane.getViewport();
				var view = viewport.getView();
				view.setY(-Math.round(newValue));
			}
		}).setPropertyName("value").setListenerComponent(this));
		
		horizontalScrollBar.addPropertyChangeListener(new jsuis.PropertyChangeListener({
			propertyChange: function(event) {
				var newValue = event.getNewValue();
				var scrollPane = this.getListenerComponent();
				var viewport = scrollPane.getViewport();
				var view = viewport.getView();
				view.setX(-Math.round(newValue));
			}
		}).setPropertyName("value").setListenerComponent(this));
	});
	jsuis.Object.addProperties(jsuis.defaultlf.ScrollPane,
			new jsuis.Property("vsbPolicy"),
			new jsuis.Property("hsbPolicy"),
			new jsuis.Property("viewport"),
			new jsuis.Property("scrollBarPanel"),
			new jsuis.Property("verticalScrollBar"),
			new jsuis.Property("horizontalScrollBar"),
			new jsuis.Property("scrollThumbPressedPoint")
	);
	jsuis.defaultlf.ScrollPane.prototype.setViewportView = function(view) {
		var viewport = this.getViewport();
		viewport.setView(view);
		return this;
	}
	jsuis.defaultlf.ScrollPane.prototype.getViewportView = function() {
		var viewport = this.getViewport();
		return viewport.getView();
	}
	// TODO ScrollPaneLayout
	jsuis.defaultlf.ScrollPane.prototype.doLayout = function() {
		var size = this.getSize();
		var insetsDimension = this.getInsets().getDimension();
		var outsetsDimension = this.getOutsets().getDimension();
		size = size.subtract(insetsDimension.add(outsetsDimension));
		var width = size.getWidth();
		var height = size.getHeight();
		var vsbPolicy = this.getVsbPolicy();
		var verticalScrollBar = this.getVerticalScrollBar();
		var verticalScrollBarVisible = verticalScrollBar.isVisible();
		if (verticalScrollBarVisible && (vsbPolicy === jsuis.Constants.VERTICAL_SCROLLBAR_NEVER)) {
			verticalScrollBarVisible = false;
		} else if (!verticalScrollBarVisible && (vsbPolicy === jsuis.Constants.VERTICAL_SCROLLBAR_ALWAYS)) {
			verticalScrollBarVisible = true;
		}
		var hsbPolicy = this.getHsbPolicy();
		var horizontalScrollBar = this.getHorizontalScrollBar();
		var horizontalScrollBarVisible = horizontalScrollBar.isVisible();
		if (horizontalScrollBarVisible && (hsbPolicy === jsuis.Constants.HORIZONTAL_SCROLLBAR_NEVER)) {
			horizontalScrollBarVisible = false;
		} else if (!horizontalScrollBarVisible && (hsbPolicy === jsuis.Constants.HORIZONTAL_SCROLLBAR_ALWAYS)) {
			horizontalScrollBarVisible = true;
		}
		var verticalScrollBarPreferredSize = verticalScrollBar.getPreferredSize();
		var verticalScrollBarPreferredWidth = verticalScrollBarPreferredSize.getWidth();
		var horizontalScrollBarPreferredSize = horizontalScrollBar.getPreferredSize();
		var horizontalScrollBarPreferredHeight = horizontalScrollBarPreferredSize.getHeight();
		var view = this.getViewportView();
		if (view) {
			var viewSize;
			var viewMinimumSize;
			for (var i = 0; i < 2; i++) {
				viewSize = new jsuis.Dimension(width - (verticalScrollBarVisible ? verticalScrollBarPreferredWidth : 0),
						height - (horizontalScrollBarVisible ? horizontalScrollBarPreferredHeight : 0));
				view.setSize(viewSize);
				var viewMinimumSize = view.getMinimumSize();
				if (vsbPolicy === jsuis.Constants.VERTICAL_SCROLLBAR_AS_NEEDED) {
					var visible = (viewMinimumSize.getHeight() > height);
					if (visible !== verticalScrollBarVisible) {
						verticalScrollBarVisible = visible;
						continue;
					}
				}
				if (hsbPolicy === jsuis.Constants.HORIZONTAL_SCROLLBAR_AS_NEEDED) {
					var visible = (viewMinimumSize.getWidth() > width);
					if (visible !== horizontalScrollBarVisible) {
						horizontalScrollBarVisible = visible;
						continue;
					}
				}
				break;
			}
			viewSize = new jsuis.Dimension(width - (verticalScrollBarVisible ? verticalScrollBarPreferredWidth : 0),
					height - (horizontalScrollBarVisible ? horizontalScrollBarPreferredHeight : 0));
			var viewWidth = Math.max(viewSize.getWidth(), viewMinimumSize.getWidth());
			var viewHeight = Math.max(viewSize.getHeight(), viewMinimumSize.getHeight());
			view.setSize(new jsuis.Dimension(viewWidth, viewHeight));
			verticalScrollBar.setMaximum(viewHeight);
			horizontalScrollBar.setMaximum(viewWidth);
		}
		horizontalScrollBar.setExtent(width - (verticalScrollBarVisible ? verticalScrollBarPreferredWidth : 0));
		verticalScrollBar.setExtent(height- (horizontalScrollBarVisible ? horizontalScrollBarPreferredHeight : 0));
		horizontalScrollBar.setValue(Math.min(Math.max(horizontalScrollBar.getValue(), horizontalScrollBar.getMinimum()),
				horizontalScrollBar.getMaximum() - horizontalScrollBar.getExtent()));
		verticalScrollBar.setValue(Math.min(Math.max(verticalScrollBar.getValue(), verticalScrollBar.getMinimum()),
				verticalScrollBar.getMaximum() - verticalScrollBar.getExtent()));
		verticalScrollBar.setVisible(verticalScrollBarVisible);
		horizontalScrollBar.setVisible(horizontalScrollBarVisible);
		SUPER.prototype.doLayout.call(this);
	}
	jsuis.defaultlf.ScrollPane.prototype.getMinimumSize = function() {
		return new jsuis.Dimension(0, 0);
	}
}) (jsuis);
