/**
 * jsuis.Cursor
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.Cursor = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this);
	});
	
	jsuis.Cursor.COPY = "copy";
	jsuis.Cursor.CROSSHAIR_CURSOR = "crosshair";
	jsuis.Cursor.DEFAULT_CURSOR = "default";
	jsuis.Cursor.E_RESIZE_CURSOR = "e-resize";
	jsuis.Cursor.HAND_CURSOR = "pointer";
	jsuis.Cursor.MOVE_CURSOR = "move";
	jsuis.Cursor.N_RESIZE_CURSOR = "n-resize";
	jsuis.Cursor.NE_RESIZE_CURSOR = "ne-resize";
	jsuis.Cursor.NW_RESIZE_CURSOR = "nw-resize";
	jsuis.Cursor.S_RESIZE_CURSOR = "s-resize";
	jsuis.Cursor.SE_RESIZE_CURSOR = "se-resize";
	jsuis.Cursor.SW_RESIZE_CURSOR = "sw-resize";
	jsuis.Cursor.TEXT_CURSOR = "text";
	jsuis.Cursor.W_RESIZE_CURSOR = "w-resize";
	jsuis.Cursor.WAIT_CURSOR = "wait";
	
}) (jsuis);
