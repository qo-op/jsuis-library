/**
 * jsuis.lf.TableViewport
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Panel;
	jsuis.lf.TableViewport = jsuis.Object.extend(SUPER, function(view) {
		SUPER.prototype.constructor.call(this, null);
		if ((view !== null) && (view !== undefined)) {
			this.setView(view);
		}
		this.setStyleProperty("overflow", "hidden");
		this.setAdjustmentListeners([]);
	});
	jsuis.Object.addProperties(jsuis.lf.TableViewport, {
		view: null,
		viewPosition: null,
		adjustmentListeners: null
	});
	jsuis.lf.TableViewport.prototype.setView = function(view) {
		this.removeAll();
		this.add(view);
		this.view = view;
		return this;
	}
	jsuis.lf.TableViewport.prototype.setSize = function(size) {
		SUPER.prototype.setSize.call(this, size);
		var view = this.getView();
		if (view) {
			view.paint();
		}
		return this;
	}
	jsuis.lf.TableViewport.prototype.addAdjustmentListener = function(adjustmentListener) {
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
	jsuis.lf.TableViewport.prototype.removeAdjustmentListener = function(adjustmentListener) {
		var adjustmentListeners = this.getAdjustmentListeners();
		var index = adjustmentListeners.indexOf(adjustmentListener);
		if (index !== -1) {
			adjustmentListeners.splice(index, 1);
		}
	}
	jsuis.lf.TableViewport.prototype.fireAdjustmentValueChanged = function(domEvent) {
		var adjustmentEvent = new jsuis.lf.AdjustmentEvent(domEvent).setSource(this);
		var adjustmentListeners = this.getAdjustmentListeners();
		for (var i = 0; i < adjustmentListeners.length; i++) {
			var adjustmentListener = adjustmentListeners[i];
			adjustmentListener.adjustmentValueChanged(adjustmentEvent);
		}
	}
}) (jsuis);
