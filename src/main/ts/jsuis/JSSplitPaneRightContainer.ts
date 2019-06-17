/// <reference path = "../jsuis.ts"/>
/**
 * JSSplitPaneRightContainer
 * 
 * @author Yassuo Toda
 */
class JSSplitPaneRightContainer extends JSPanel {
    
    constructor();
    constructor(element: HTMLElement);
    // overload
    constructor(...args: any[]) {
        // constructor();
        // constructor(element: HTMLElement);
        super(args.length === 0 || !(args[0] instanceof HTMLDivElement) ? document.createElement("div") : args[0]);
        this.setUI("JSSplitPaneRightContainer");
        this.setLayout(new JSBorderLayout());
    }
}