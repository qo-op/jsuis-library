/// <reference path = "../jsuis.ts"/>
/**
 * JSSplitPaneLeftContainer
 * 
 * @author Yassuo Toda
 */
class JSSplitPaneLeftContainer extends JSPanel {
    
    constructor();
    constructor(element: HTMLDivElement);
    // overload
    constructor(...args: any[]) {
        super(args.length === 0 || !(args[0] instanceof HTMLDivElement) ? document.createElement("div") : args[0]);
    }
    init(): void {
        this.addClass("JSSplitPaneLeftContainer");
        this.setLayout(new JSBorderLayout());
    }
}