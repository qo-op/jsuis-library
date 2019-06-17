/// <reference path = "../jsuis.ts"/>
/**
 * JSSplitPaneDivider
 * 
 * @author Yassuo Toda
 */
class JSSplitPaneDivider extends JSPanel {
    
    constructor();
    constructor(element: HTMLElement);
    // overload
    constructor(...args: any[]) {
        // constructor();
        // constructor(element: HTMLElement);
        super(args.length === 0 || !(args[0] instanceof HTMLDivElement) ? document.createElement("div") : args[0]);
        this.setUI("JSSplitPaneDivider");
        
        this.addMouseListener({
            mousePressed(mouseEvent: MouseEvent, divider: JSSplitPaneDivider) {
                var splitPane: JSSplitPane = <JSSplitPane> divider.getParent();
                var orientation = splitPane.getOrientation();
                if (orientation === JSSplitPane.VERTICAL_SPLIT) {
                    splitPane.setData("dy", mouseEvent.y - splitPane.getDividerLocation());
                } else {
                    splitPane.setData("dx", mouseEvent.x - splitPane.getDividerLocation());
                }
                mouseEvent.stopPropagation();
            },
            mouseDragged(mouseEvent: MouseEvent, divider: JSSplitPaneDivider) {
                var splitPane: JSSplitPane = <JSSplitPane> divider.getParent();
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
        }).withParameters(this);
    }
}