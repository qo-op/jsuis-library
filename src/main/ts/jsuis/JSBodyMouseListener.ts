/// <reference path = "../jsuis.ts"/>
/**
 * JSBodyMouseListener
 * 
 * @author Yassuo Toda
 */
class JSBodyMouseListener implements JSMouseListener {
    
    mouseMoved(mouseEvent: MouseEvent) {
        var body: JSBody = JSBody.getInstance();
        var dragSource: JSComponent = body.getDragSource();
        if (dragSource) {
            var dragging: boolean = dragSource.isDragging();
            if (!dragging) {
                // body.getGlassPane().setStyle("display", "");
                dragSource.fireDragStart(mouseEvent);
                dragSource.setDragging(true);
            }
            dragSource.fireDrag(mouseEvent);
            dragSource.fireMouseDragged(mouseEvent);
        }
    }
    mouseReleased(mouseEvent: MouseEvent) {
        var body: JSBody = JSBody.getInstance();
        var dragSource: JSComponent = body.getDragSource();
        if (dragSource) {
            var timer: JSTimer = body.getTimer();
            timer.schedule({
                run() {
                    var body: JSBody = JSBody.getInstance();
                    var dragging = dragSource.isDragging();
                    if (dragging) {
                        dragSource.fireDragEnd(mouseEvent);
                        dragSource.setDragging(false);
                        dragSource.fireMouseReleased(mouseEvent);
                        // body.getGlassPane().setStyle("display", "none");
                    }
                    body.setDragSource(null);
                }
            }, 0);
        }
    }
}