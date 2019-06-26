/// <reference path = "../jsuis.ts"/>
/**
 * JSBodyMouseListener
 * 
 * @author Yassuo Toda
 */
class JSBodyMouseListener implements MouseListener {
    
    mouseMoved(mouseEvent: MouseEvent) {
        var body: JSBody = JSBody.getInstance();
        var dragSource: JSComponent = body.getDragSource();
        if (dragSource) {
            var dragStart = dragSource.getData("dragStart");
            if (!dragStart) {
                dragSource.fireDragStart(mouseEvent);
                dragSource.setData("dragStart", true);
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
                    var dragStart = dragSource.getData("dragStart");
                    if (dragStart) {
                        dragSource.fireDragEnd(mouseEvent);
                        dragSource.setData("dragStart", false);
                    }
                    JSBody.getInstance().setDragSource(null);
                }
            }, 0);
        }
    }
}