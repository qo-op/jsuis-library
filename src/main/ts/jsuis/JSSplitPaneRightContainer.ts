/// <reference path = "../jsuis.ts"/>
/**
 * JSSplitPaneRightContainer
 * 
 * @author Yassuo Toda
 */
class JSSplitPaneRightContainer extends JSPanel {
    
    constructor();
    constructor(element: HTMLDivElement);
    // overload
    constructor(...args: any[]) {
        super(args.length === 0 || !(args[0] instanceof HTMLDivElement) ? document.createElement("div") : args[0]);
    }
    init(): void {
        this.addClass("JSSplitPaneRightContainer");
        this.setLayout(new JSBorderLayout());
    }
}