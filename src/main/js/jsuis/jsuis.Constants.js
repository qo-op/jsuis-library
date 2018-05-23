/**
 * jsuis.Constants
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.Constants = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this);
	});
	
	jsuis.Constants.SVG = "http://www.w3.org/2000/svg";
	
	var CONSTANTS = {
			ABOVE_BASELINE: "",
			ABOVE_BASELINE_LEADING: "",
			ABOVE_BASELINE_TRAILING: "",
			ACTION_PERFORMED: "",
			AFTER_LAST_LINE: "",
			AFTER_LINE_ENDS: "",
			APPROVE_OPTION: "",
			BASELINE: "",
			BASELINE_LEADING: "",
			BASELINE_TRAILING: "",
			BELOW_BASELINE: "",
			BELOW_BASELINE_LEADING: "",
			BELOW_BASELINE_TRAILING: "",
			BEFORE_FIRST_LINE: "",
			BEFORE_LINE_BEGINS: "",
			BOTH: "",
			BOTTOM: "",
			CANCEL_OPTION: "",
			CENTER: "",
			COMPONENT_MOVED: "",
			COMPONENT_RESIZED: "",
			EAST: "",
			ERROR_OPTION: "",
			FIRST_LINE_END: "",
			FIRST_LINE_START: "",
			FOCUS_GAINED: "",
			FOCUS_LOST: "",
			HORIZONTAL: "",
			HORIZONTAL_SCROLLBAR_ALWAYS: "",
			HORIZONTAL_SCROLLBAR_AS_NEEDED: "",
			HORIZONTAL_SCROLLBAR_NEVER: "",
			LAST_LINE_END: "",
			LAST_LINE_START: "",
			LEADING: "",
			LEFT: "",
			LINE_END: "",
			LINE_START: "",
			MOUSE_CLICKED: "",
			MOUSE_DRAGGED: "",
			MOUSE_ENTERED: "",
			MOUSE_EXITED: "",
			MOUSE_MOVED: "",
			MOUSE_PRESSED: "",
			MOUSE_RELEASED: "",
			NEXT: "",
			NONE: "",
			NORTH: "",
			NORTHEAST: "",
			NORTHWEST: "",
			NORTH_EAST: "",
			NORTH_WEST: "",
			PAGE_END: "",
			PAGE_START: "",
			PREVIOUS: "",
			RELATIVE: "",
			REMAINDER: "",
			RIGHT: "",
			SOUTH: "",
			SOUTHEAST: "",
			SOUTHWEST: "",
			SOUTH_EAST: "",
			SOUTH_WEST: "",
			TOP: "",
			TOUCH_PRESSED: "",
			TOUCH_RELEASED: "",
			TOUCH_MOVED: "",
			TRAILING: "",
			VERTICAL: "",
			VERTICAL_SCROLLBAR_ALWAYS: "",
			VERTICAL_SCROLLBAR_AS_NEEDED: "",
			VERTICAL_SCROLLBAR_NEVER: "",
			WEST: ""
	}
	
	for (var key in CONSTANTS) {
		jsuis.Constants[key] = (key.charAt(0) + key.slice(1).toLowerCase())
				.replace(/_([a-z])/g, function(g) {
					return g[1].toUpperCase()
				});
	}

	jsuis.Constants.FRAME_CONTENT_LAYER = -30000;
	jsuis.Constants.DEFAULT_LAYER = 0;
	jsuis.Constants.PALETTE_LAYER = 100;
	jsuis.Constants.MODAL_LAYER = 200;
	jsuis.Constants.POPUP_LAYER = 300;
	jsuis.Constants.DRAG_LAYER = 400;
	
})(jsuis);
