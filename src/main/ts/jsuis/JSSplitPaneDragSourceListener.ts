/// <reference path = "../jsuis.ts"/>
/**
 * JSSplitPaneDragSourceListener
 * 
 * @author Yassuo Toda
 */
class JSSplitPaneDragSourceListener implements DragSourceListener {
    
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
    dragStart(mouseEvent: MouseEvent) {
        /*
        var splitPane: JSSplitPane = this.getSplitPane();
        var panel: JSPanel = splitPane.getPanel();
        panel.setStyle("display", "");
        */
        JSBody.getInstance().getGlassPane().setStyle("display", "");
    }
    dragEnd(mouseEvent: MouseEvent) {
        /*
        var splitPane: JSSplitPane = this.getSplitPane();
        var panel: JSPanel = splitPane.getPanel();
        panel.setStyle("display", "none");
        */
        JSBody.getInstance().getGlassPane().setStyle("display", "none");
    }
}
