/**
 * jsuis.defaultlf.SplitPane
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Panel;
	jsuis.defaultlf.SplitPane = jsuis.Object.extend(SUPER, function(orientation, leftComponent, rightComponent) {
		SUPER.prototype.constructor.call(this, null);
		orientation = nvl(orientation, jsuis.Constants.HORIZONTAL);
		this.setOrientation(orientation);
		this.setLeftComponent(leftComponent || new jsuis.defaultlf.Button("Left"));
		this.setRightComponent(rightComponent || new jsuis.defaultlf.Button("Right"));
		var splitPaneDivider = new jsuis.defaultlf.SplitPaneDivider();
		this.setDivider(splitPaneDivider);
		this.add(splitPaneDivider);
		this.setDividerSize(8);
		this.setResizeWeight(0);
		
		var dividerMouseListener = new jsuis.MouseListener({
			mousePressed: function(event) {
				var splitPane = this.getListenerComponent();
				var point = event.getPoint();
				splitPane.setDividerPressedPoint(point);
			}
		});
		dividerMouseListener.setListenerComponent(this);
		splitPaneDivider.addMouseListener(dividerMouseListener);
		
		var dividerMouseMotionListener = new jsuis.MouseMotionListener({
			mouseDragged: function(event) {
				var splitPane = this.getListenerComponent();
				var point = event.getPoint();
				var pressedPoint = splitPane.getDividerPressedPoint();
				var divider = splitPane.getDivider();
				var orientation = splitPane.getOrientation();
				if (orientation === jsuis.Constants.HORIZONTAL) {
					var dx = point.getX() - pressedPoint.getX();
					var maximumX = splitPane.getWidth() - divider.getWidth();
					var x = Math.min(Math.max(divider.getX() + dx, 0), maximumX);
					splitPane.setDividerLocation(x);
					splitPane.validate();
				} else {
					var dy = point.getY() - pressedPoint.getY();
					var maximumY = splitPane.getHeight() - divider.getHeight();
					var y = Math.min(Math.max(divider.getY() + dy, 0), maximumY);
					splitPane.setDividerLocation(y);
					splitPane.validate();
				}
			}
		});
		dividerMouseMotionListener.setListenerComponent(this);
		splitPaneDivider.addMouseMotionListener(dividerMouseMotionListener);
		
		var dividerTouchListener = new jsuis.TouchListener({
			touchPressed: function(event) {
				dividerMouseListener.mousePressed(event);
			},
			touchMoved: function(event) {
				dividerMouseMotionListener.mouseDragged(event);
			}
		});
		splitPaneDivider.addTouchListener(dividerTouchListener);
	});
	jsuis.Object.addProperties(jsuis.defaultlf.SplitPane,
			new jsuis.Property("orientation"),
			new jsuis.Property("leftComponent"),
			new jsuis.Property("rightComponent"),
			new jsuis.Property("divider"),
			new jsuis.Property("dividerLocation"),
			new jsuis.Property("dividerSize"),
			new jsuis.Property("dividerPressedPoint"),
			new jsuis.Property("resizeWeight")
	);
	jsuis.defaultlf.SplitPane.prototype.setLeftComponent = function(leftComponent) {
		var oldLeftComponent = this.getLeftComponent();
		if (oldLeftComponent) {
			this.remove(oldLeftComponent);
		}
		this.add(leftComponent);
		this.leftComponent = leftComponent;
		return this;
	}
	jsuis.defaultlf.SplitPane.prototype.setRightComponent = function(rightComponent) {
		var oldRightComponent = this.getRightComponent();
		if (oldRightComponent) {
			this.remove(oldRightComponent);
		}
		this.add(rightComponent);
		this.rightComponent = rightComponent;
		return this;
	}
	jsuis.defaultlf.SplitPane.prototype.getTopComponent = function() {
		return this.getLeftComponent();
	}
	jsuis.defaultlf.SplitPane.prototype.setTopComponent = function(topComponent) {
		this.setLeftComponent(topComponent);
		return this;
	}
	jsuis.defaultlf.SplitPane.prototype.getBottomComponent = function() {
		return this.getRightComponent();
	}
	jsuis.defaultlf.SplitPane.prototype.setBottomComponent = function(bottomComponent) {
		this.setRightComponent(bottomComponent);
		return this;
	}
	jsuis.defaultlf.SplitPane.prototype.setDividerLocation = function(dividerLocation) {
		this.dividerLocation = dividerLocation;
		return this;
	}
	jsuis.defaultlf.SplitPane.prototype.validate = function() {
		this.setLayoutBounds(null);
		var x = 0;
		var y = 0;
		var width = this.getWidth();
		var height = this.getHeight();
		var insetsOutsets = this.getInsets().add(this.getOutsets());
		x += insetsOutsets.getLeft();
		y += insetsOutsets.getTop();
		width -= insetsOutsets.getLeft() + insetsOutsets.getRight();
		height -= insetsOutsets.getTop() + insetsOutsets.getBottom();
		var firstComponent = this.getLeftComponent();
		var firstComponentMinimumSize = firstComponent.getMinimumSize();
		var secondComponent = this.getRightComponent();
		var secondComponentMinimumSize = secondComponent.getMinimumSize();
		var divider = this.getDivider();
		var dividerLocation = this.getDividerLocation();
		var dividerSize = this.getDividerSize();
		var resizeWeight = Math.min(Math.max(this.getResizeWeight(), 0), 1);
		var orientation = this.getOrientation();
		if (orientation === jsuis.Constants.HORIZONTAL) {
			var firstComponentMinimumWidth = firstComponentMinimumSize.getWidth();
			var secondComponentMinimumWidth = secondComponentMinimumSize.getWidth();
			var minimum = x + firstComponentMinimumWidth;
			var maximum = x + width - secondComponentMinimumWidth - dividerSize;
			var firstComponentWidth = firstComponentMinimumWidth;
			if (dividerLocation !== null && dividerLocation !== undefined) {
				dividerLocation = Math.min(Math.max(dividerLocation, minimum), maximum);
				firstComponentWidth = dividerLocation - x;
			} else {
				var dwidth = width - firstComponentMinimumWidth - dividerSize - secondComponentMinimumWidth;
				firstComponentWidth = firstComponentMinimumWidth + dwidth * resizeWeight;
				this.setDividerLocation(x + firstComponentWidth);
			}
			firstComponent.setBounds(new jsuis.Rectangle(x, y, firstComponentWidth, height));
			divider.setBounds(new jsuis.Rectangle(x + firstComponentWidth, y, dividerSize, height));
			secondComponent.setBounds(new jsuis.Rectangle(x + firstComponentWidth + dividerSize, y, width - firstComponentWidth - dividerSize, height));
		} else {
			var firstComponentMinimumHeight = firstComponentMinimumSize.getHeight();
			var secondComponentMinimumHeight = secondComponentMinimumSize.getHeight();
			var minimum = y + firstComponentMinimumHeight;
			var maximum = y + height - secondComponentMinimumHeight - dividerSize;
			var firstComponentHeight = firstComponentMinimumHeight;
			if (dividerLocation !== null && dividerLocation !== undefined) {
				dividerLocation = Math.min(Math.max(dividerLocation, minimum), maximum);
				firstComponentHeight = dividerLocation - y;
			} else {
				var dheight = height - firstComponentMinimumHeight - dividerSize - secondComponentMinimumHeight;
				firstComponentHeight = firstComponentMinimumHeight + dheight * resizeWeight;
				this.setDividerLocation(y + firstComponentHeight);
			}
			firstComponent.setBounds(new jsuis.Rectangle(x, y, width, firstComponentHeight));
			divider.setBounds(new jsuis.Rectangle(x, y + firstComponentHeight, width, dividerSize));
			secondComponent.setBounds(new jsuis.Rectangle(x, y + firstComponentHeight + dividerSize, width, height - firstComponentHeight - dividerSize));
		}
		var components = this.getComponents();
		for (var i = 0; i < components.length; i++) {
			var component = components[i];
			component.validate();
		}
	}
}) (jsuis);
