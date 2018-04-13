/**
 * jsuis.defaultlf.Viewport
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Component;
	jsuis.defaultlf.Viewport = jsuis.Object.extend(SUPER, function(view, viewBox) {
		SUPER.prototype.constructor.call(this, document.createElementNS(jsuis.Constants.SVG, "svg"));
		if ((view !== null) && (view !== undefined)) {
			this.setView(view);
		}
		if ((viewBox !== null) && (viewBox !== undefined)) {
			this.setViewBox(viewBox);
		}
		this.setAttribute("preserveAspectRatio", "none");
	});
	jsuis.Object.addProperties(jsuis.defaultlf.Viewport, {
		view: null,
		viewPosition: null
	});
	jsuis.defaultlf.Viewport.prototype.setView = function(view) {
		this.removeAll();
		this.add(view);
		this.view = view;
		return this;
	}
	jsuis.defaultlf.Viewport.prototype.getGraphics = function() {
		var view = this.getView();
		if (view) {
			return view.getPeer().getGraphics();
		}
	}
	jsuis.defaultlf.Viewport.prototype.getViewBox = function() {
		return this.viewBox || new jsuis.Rectangle();
	}
	jsuis.defaultlf.Viewport.prototype.setViewBox = function(viewBox) {
		this.viewBox = viewBox;
		this.setAttribute("viewBox", viewBox.getX() + " " + viewBox.getY() + " " + viewBox.getWidth() + " " + viewBox.getHeight());
		return this;
	}
}) (jsuis);
