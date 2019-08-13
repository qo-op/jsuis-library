/// <reference path = "../jsuis.ts"/>
/**
 * JSSplitPaneMouseListener
 * 
 * @author Yassuo Toda
 */
class JSSplitPaneMouseListener implements JSMouseListener {
    
    private splitPane: JSSplitPane;
    private x: number = 0;
    private y: number = 0;
    
    constructor(splitPane: JSSplitPane) {
        this.setSplitPane(splitPane);
    }
    getSplitPane(): JSSplitPane {
        return this.splitPane;
    }
    setSplitPane(splitPane: JSSplitPane) {
        this.splitPane = splitPane;
    }
    getX(): number {
        return this.x;
    }
    setX(x: number) {
        this.x = x;
    }
    getY(): number {
        return this.y;
    }
    setY(y: number) {
        this.y = y;
    }
    mousePressed(mouseEvent: MouseEvent): void {
        var splitPane: JSSplitPane = this.getSplitPane();
        var orientation = splitPane.getOrientation();
        if (orientation === JSSplitPane.VERTICAL_SPLIT) {
            this.setY(mouseEvent.y - splitPane.getDividerLocation());
        } else {
            this.setX(mouseEvent.x - splitPane.getDividerLocation());
        }
        mouseEvent.stopPropagation();
    }
    mouseDragged(mouseEvent: MouseEvent): void {
        var body: JSBody = JSBody.getInstance();
        var glassPane: JSBodyGlassPane = body.getGlassPane();
        glassPane.setStyle("display", "");
        var splitPane: JSSplitPane = this.getSplitPane();
        var orientation = splitPane.getOrientation();
        if (orientation === JSSplitPane.VERTICAL_SPLIT) {
            splitPane.setDividerLocation(mouseEvent.y - this.getY(), splitPane.getDividerProportionalLocation());
        } else {
            splitPane.setDividerLocation(mouseEvent.x - this.getX(), splitPane.getDividerProportionalLocation());
        }
        mouseEvent.stopPropagation();
    }
    mouseReleased(mouseEvent: MouseEvent): void {
        var body: JSBody = JSBody.getInstance();
        var glassPane: JSBodyGlassPane = body.getGlassPane();
        glassPane.setStyle("display", "none");
    }
}