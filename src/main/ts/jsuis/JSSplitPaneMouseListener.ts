/// <reference path = "../jsuis.ts"/>
/**
 * JSSplitPaneMouseListener
 * 
 * @author Yassuo Toda
 */
class JSSplitPaneMouseListener implements MouseListener {
    
    splitPane: JSSplitPane;
    
    constructor(splitPane: JSSplitPane) {
        this.setSplitPane(splitPane);
    }
    getSplitPane(): JSSplitPane {
        return this.splitPane;
    }
    setSplitPane(splitPane: JSSplitPane) {
        this.splitPane = splitPane;
    }
    mousePressed(mouseEvent: MouseEvent) {
        var splitPane: JSSplitPane = this.getSplitPane();
        var orientation = splitPane.getOrientation();
        if (orientation === JSSplitPane.VERTICAL_SPLIT) {
            splitPane.setData("dy", mouseEvent.y - splitPane.getDividerLocation());
        } else {
            splitPane.setData("dx", mouseEvent.x - splitPane.getDividerLocation());
        }
        mouseEvent.stopPropagation();
    }
    mouseDragged(mouseEvent: MouseEvent) {
        var splitPane: JSSplitPane = this.getSplitPane();
        var orientation = splitPane.getOrientation();
        if (orientation === JSSplitPane.VERTICAL_SPLIT) {
            var y = mouseEvent.y;
            if (y) {
                splitPane.setDividerLocation(y - splitPane.getData("dy"), splitPane.getDividerProportionalLocation());
            }
        } else {
            var x = mouseEvent.x;
            if (x) {
                splitPane.setDividerLocation(x - splitPane.getData("dx"), splitPane.getDividerProportionalLocation());
            }
        }
        mouseEvent.stopPropagation();
    }
}