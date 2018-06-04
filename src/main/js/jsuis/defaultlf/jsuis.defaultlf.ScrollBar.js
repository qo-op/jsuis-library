/**
 * jsuis.defaultlf.ScrollBar
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Panel;
	jsuis.defaultlf.ScrollBar = jsuis.Object.extend(SUPER, function(orientation) {
		SUPER.prototype.constructor.call(this, new jsuis.BorderLayout());
		orientation = nvl(orientation, jsuis.defaultlf.ScrollBar.VERTICAL);
		this.setOrientation(orientation);
		
		var layeredPane = new jsuis.defaultlf.LayeredPane();
		this.add(layeredPane);
		layeredPane.setLayout(new jsuis.BorderLayout());
		
		var scrollTrack = new jsuis.defaultlf.ScrollTrack(orientation);
		this.setScrollTrack(scrollTrack);
		layeredPane.add(scrollTrack);
		
		var scrollThumbPanel = new jsuis.defaultlf.Panel(null);
		layeredPane.add(scrollThumbPanel);
		
		var scrollThumb = new jsuis.defaultlf.ScrollThumb(orientation);
		this.setScrollThumb(scrollThumb);
		scrollThumbPanel.add(scrollThumb);
		scrollThumb.setBounds(new jsuis.Rectangle(0, 0, 16, 16));
		
		var decreaseButton;
		var increaseButton;
		if (orientation === jsuis.Constants.HORIZONTAL) {
			decreaseButton = new jsuis.defaultlf.ScrollButton(jsuis.Constants.WEST);
			this.add(decreaseButton, jsuis.Constraints.WEST);
			increaseButton = new jsuis.defaultlf.ScrollButton(jsuis.Constants.EAST);
			this.add(increaseButton, jsuis.Constraints.EAST);
		} else {
			decreaseButton = new jsuis.defaultlf.ScrollButton(jsuis.Constants.NORTH);
			this.add(decreaseButton, jsuis.Constraints.NORTH);
			increaseButton = new jsuis.defaultlf.ScrollButton(jsuis.Constants.SOUTH);
			this.add(increaseButton, jsuis.Constraints.SOUTH);
		}
		this.setDecreaseButton(decreaseButton);
		this.setIncreaseButton(increaseButton);
		
		var scrollThumbMouseListener = new jsuis.MouseListener({
			mousePressed: function(event) {
				var scrollBar = this.getListenerComponent();
				var point = event.getPoint();
				scrollBar.setScrollThumbPressedPoint(point);
			}
		});
		scrollThumbMouseListener.setListenerComponent(this);
		scrollThumb.addMouseListener(scrollThumbMouseListener);
		
		var scrollThumbMouseMotionListener = new jsuis.MouseMotionListener({
			mouseDragged: function(event) {
				var scrollBar = this.getListenerComponent();
				var point = event.getPoint();
				var pressedPoint = scrollBar.getScrollThumbPressedPoint();
				var scrollTrack = scrollBar.getScrollTrack();
				var scrollThumb = scrollBar.getScrollThumb();
				var extent = scrollBar.getExtent();
				var maximum = scrollBar.getMaximum();
				var orientation = scrollBar.getOrientation();
				if (orientation === jsuis.Constants.HORIZONTAL) {
					var dx = point.getX() - pressedPoint.getX();
					var maximumX = scrollTrack.getWidth() - scrollThumb.getWidth();
					var x = Math.min(Math.max(scrollThumb.getX() + dx, 0), maximumX);
					scrollThumb.setX(x);
					if (maximumX > 0) {
						scrollBar.setValue((maximum - extent) * x / maximumX);
					}
				} else {
					var dy = point.getY() - pressedPoint.getY();
					var maximumY = scrollTrack.getHeight() - scrollThumb.getHeight();
					var y = Math.min(Math.max(scrollThumb.getY() + dy, 0), maximumY);
					scrollThumb.setY(y);
					if (maximumY > 0) {
						scrollBar.setValue((maximum - extent) * y / maximumY);
					}
				}
			}
		});
		scrollThumbMouseMotionListener.setListenerComponent(this);
		scrollThumb.addMouseMotionListener(scrollThumbMouseMotionListener);
		
		if (!("onpointerdown" in window)) {
			var scrollThumbTouchListener = new jsuis.TouchListener({
				touchPressed: function(event) {
					scrollThumbMouseListener.mousePressed(event);
					event.stopPropagation();
				},
				touchMoved: function(event) {
					scrollThumbMouseMotionListener.mouseDragged(event);
					event.preventDefault();
					event.stopPropagation();
				}
			});
			scrollThumb.addTouchListener(scrollThumbTouchListener);
		}
		
		var scrollTrackMouseListener = new jsuis.MouseListener({
			mousePressed: function(event) {
				var scrollBar = this.getListenerComponent();
				var value = scrollBar.getValue();
				var minimum = scrollBar.getMinimum();
				var maximum = scrollBar.getMaximum();
				var extent = scrollBar.getExtent();
				var blockIncrement = scrollBar.getBlockIncrement();
				var scrollThumb = scrollBar.getScrollThumb();
				var point = event.getPoint();
				var timer = scrollBar.getTimer();
				var orientation = scrollBar.getOrientation();
				if (orientation === jsuis.Constants.HORIZONTAL) {
					if (point.x < (scrollThumb.getX() + scrollThumb.getWidth() / 2)) {
						scrollBar.setValue(Math.max(value - blockIncrement, minimum)).validate();
						scrollBar.setIncrement(-blockIncrement);
						timer.start();
					} else {
						scrollBar.setValue(Math.min(value + blockIncrement, maximum - extent)).validate();
						scrollBar.setIncrement(blockIncrement);
						timer.start();
					}
				} else {
					if (point.y < (scrollThumb.getY() + scrollThumb.getHeight() / 2)) {
						scrollBar.setValue(Math.max(value - blockIncrement, minimum)).validate();
						scrollBar.setIncrement(-blockIncrement);
						timer.start();
					} else {
						scrollBar.setValue(Math.min(value + blockIncrement, maximum - extent)).validate();
						scrollBar.setIncrement(blockIncrement);
						timer.start();
					}
				}
			},
			mouseReleased: function(event) {
				var scrollBar = this.getListenerComponent();
				var timer = scrollBar.getTimer();
				timer.stop();
			}
		});
		scrollTrackMouseListener.setListenerComponent(this);
		scrollTrack.addMouseListener(scrollTrackMouseListener);
		
		var decreaseMouseListener = new jsuis.MouseListener({
			mousePressed: function(event) {
				var scrollBar = this.getListenerComponent();
				var value = scrollBar.getValue();
				var unitIncrement = scrollBar.getUnitIncrement();
				var minimum = scrollBar.getMinimum();
				value = Math.max(value - unitIncrement, minimum);
				scrollBar.setValue(value);
				scrollBar.validate();
				scrollBar.setIncrement(-unitIncrement);
				var timer = scrollBar.getTimer();
				timer.start();
			},
			mouseReleased: function(event) {
				var scrollBar = this.getListenerComponent();
				var timer = scrollBar.getTimer();
				timer.stop();
			}
		});
		decreaseMouseListener.setListenerComponent(this);
		decreaseButton.addMouseListener(decreaseMouseListener);
		
		var increaseMouseListener = new jsuis.MouseListener({
			mousePressed: function(event) {
				var scrollBar = this.getListenerComponent();
				var value = scrollBar.getValue();
				var unitIncrement = scrollBar.getUnitIncrement();
				var maximum = scrollBar.getMaximum();
				var extent = scrollBar.getExtent();
				value = Math.min(value + unitIncrement, maximum - extent);
				scrollBar.setValue(value);
				scrollBar.validate();
				scrollBar.setIncrement(unitIncrement);
				var timer = scrollBar.getTimer();
				timer.start();
			},
			mouseReleased: function(event) {
				var scrollBar = this.getListenerComponent();
				var timer = scrollBar.getTimer();
				timer.stop();
			}
		});
		increaseMouseListener.setListenerComponent(this);
		increaseButton.addMouseListener(increaseMouseListener);
		
		var timerActionListener = new jsuis.ActionListener({
			actionPerformed: function(event) {
				var scrollBar = this.getListenerComponent();
				var value = scrollBar.getValue();
				var increment = scrollBar.getIncrement();
				var minimum = scrollBar.getMinimum();
				var maximum = scrollBar.getMaximum();
				var extent = scrollBar.getExtent();
				value = Math.min(Math.max(value + increment, minimum), maximum - extent);
				scrollBar.setValue(value);
				scrollBar.validate();
			}
		});
		timerActionListener.setListenerComponent(this);
		this.setTimerActionListener(timerActionListener);
		
		var timer = new jsuis.defaultlf.Timer(50, timerActionListener);
		this.setTimer(timer);
		timer.setInitialDelay(250);
	});
	jsuis.Object.addProperties(jsuis.defaultlf.ScrollBar, {
		orientation: null,
		value: 0,
		extent: 0,
		minimum: 0,
		maximum: 0,
		increment: 0,
		unitIncrement: 0,
		blockIncrement: 0,
		scrollTrack: null,
		increaseButton: null,
		decreaseButton: null,
		scrollThumb: null,
		scrollThumbPressedPoint: null,
		timerActionListener: null,
		timer: null
	});
	jsuis.defaultlf.ScrollBar.prototype.getValue = function() {
		return this.value || 0;
	}
	jsuis.defaultlf.ScrollBar.prototype.setValue = function(value) {
		var oldValue = this.value;
		this.value = value;
		this.firePropertyChange("value", oldValue, value);
		return this;
	}
	jsuis.defaultlf.ScrollBar.prototype.getExtent = function() {
		return nvl(this.extent, 32);
	}
	jsuis.defaultlf.ScrollBar.prototype.getMinimum = function() {
		return nvl(this.minimum, 0);
	}
	jsuis.defaultlf.ScrollBar.prototype.getMaximum = function() {
		return nvl(this.maximum, 1);
	}
	jsuis.defaultlf.ScrollBar.prototype.getUnitIncrement = function() {
		return nvl(this.unitIncrement, 16);
	}
	jsuis.defaultlf.ScrollBar.prototype.getBlockIncrement = function() {
		return nvl(this.blockIncrement, (this.getExtent() - this.getUnitIncrement()));
	}
	jsuis.defaultlf.ScrollBar.prototype.validate = function() {
		SUPER.prototype.validate.call(this);
		var value = this.getValue();
		var extent = this.getExtent();
		var minimum = this.getMinimum();
		var maximum = this.getMaximum();
		var scrollTrack = this.getScrollTrack();
		var scrollThumb = this.getScrollThumb();
		var orientation = this.getOrientation();
		if (orientation === jsuis.Constants.HORIZONTAL) {
			var scrollTrackWidth = scrollTrack.getWidth();
			if (scrollTrackWidth < 0) {
				scrollTrackWidth = 0;
			}
			var scrollThumbWidth = scrollTrackWidth * (extent / (maximum - minimum));
			scrollThumbWidth = Math.min(Math.max(scrollThumbWidth,
					scrollThumb.getMinimumSize().getWidth()), scrollTrackWidth);
			var scrollThumbX = scrollTrackWidth - scrollThumbWidth;
			if ((maximum - minimum) === extent) {
				scrollThumbX = 0;
			} else if (value < (maximum - extent)) {
				scrollThumbX = (scrollTrackWidth - scrollThumbWidth) * (value - minimum) / (maximum - minimum - extent);
			}
			scrollThumb.setBounds(new jsuis.Rectangle(Math.round(scrollThumbX), scrollThumb.getY(), Math.round(scrollThumbWidth), scrollThumb.getHeight()));
		} else {
			var scrollTrackHeight = scrollTrack.getHeight();
			if (scrollTrackHeight < 0) {
				scrollTrackHeight = 0;
			}
			var scrollThumbHeight = scrollTrackHeight * (extent / (maximum - minimum));
			scrollThumbHeight = Math.min(Math.max(scrollThumbHeight,
					scrollThumb.getMinimumSize().getHeight()), scrollTrackHeight);
			var scrollThumbY = scrollTrackHeight - scrollThumbHeight;
			if ((maximum - minimum) === extent) {
				scrollThumbY = 0;
			} else if (value < (maximum - extent)) {
				scrollThumbY = (scrollTrackHeight - scrollThumbHeight) * (value - minimum) / (maximum - minimum - extent);
			}
			scrollThumb.setBounds(new jsuis.Rectangle(scrollThumb.getX(), Math.round(scrollThumbY), scrollThumb.getWidth(), Math.round(scrollThumbHeight)));
		}
		scrollThumb.validate();
	}
}) (jsuis);
