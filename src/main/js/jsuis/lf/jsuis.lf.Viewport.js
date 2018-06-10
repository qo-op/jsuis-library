/**
 * jsuis.lf.Viewport
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Panel;
	jsuis.lf.Viewport = jsuis.Object.extend(SUPER, function(view, viewBox) {
		SUPER.prototype.constructor.call(this, null);
		if ((view !== null) && (view !== undefined)) {
			this.setView(view);
		}
		if ((viewBox !== null) && (viewBox !== undefined)) {
			this.setViewBox(viewBox);
		}
		this.setStyleProperty("overflow", "auto");
		this.setAdjustmentListeners([]);
	});
	jsuis.Object.addProperties(jsuis.lf.Viewport, {
		view: null,
		viewPosition: null,
		adjustmentListeners: null
	});
	jsuis.lf.Viewport.prototype.setView = function(view) {
		this.removeAll();
		this.add(view);
		this.view = view;
		return this;
	}
	jsuis.lf.Viewport.prototype.setSize = function(size) {
		SUPER.prototype.setSize.call(this, size);
		var view = this.getView();
		if (view) {
			view.paint();
		}
		return this;
	}
	jsuis.lf.Viewport.prototype.getViewBox = function() {
		return this.viewBox || new jsuis.Rectangle();
	}
	jsuis.lf.Viewport.prototype.setViewBox = function(viewBox) {
		this.viewBox = viewBox;
		this.setAttribute("viewBox", viewBox.getX() + " " + viewBox.getY() + " " + viewBox.getWidth() + " " + viewBox.getHeight());
		return this;
	}
	jsuis.lf.Viewport.prototype.addAdjustmentListener = function(adjustmentListener) {
		var adjustmentListeners = this.getAdjustmentListeners();
		adjustmentListeners.push(adjustmentListener);
		var component = this;
		var listener = adjustmentListener.getListener();
		if (listener.adjustmentValueChanged) {
			var onscroll = this.getEventListener("scroll");
			if (!onscroll) {
				this.setEventListener("scroll", function(event) {
					component.fireAdjustmentValueChanged(event);
				});
			}
		}
	}
	jsuis.lf.Viewport.prototype.removeAdjustmentListener = function(adjustmentListener) {
		var adjustmentListeners = this.getAdjustmentListeners();
		var index = adjustmentListeners.indexOf(adjustmentListener);
		if (index !== -1) {
			adjustmentListeners.splice(index, 1);
		}
	}
	jsuis.lf.Viewport.prototype.fireAdjustmentValueChanged = function(domEvent) {
		var adjustmentEvent = new jsuis.lf.AdjustmentEvent(domEvent).setSource(this);
		var adjustmentListeners = this.getAdjustmentListeners();
		for (var i = 0; i < adjustmentListeners.length; i++) {
			var adjustmentListener = adjustmentListeners[i];
			adjustmentListener.adjustmentValueChanged(adjustmentEvent);
		}
	}
}) (jsuis);
