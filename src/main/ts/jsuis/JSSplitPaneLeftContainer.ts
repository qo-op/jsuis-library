/// <reference path = "../jsuis.ts"/>
/**
 * JSSplitPaneLeftContainer
 * 
 * @author Yassuo Toda
 */
class JSSplitPaneLeftContainer extends JSPanel {
    
    constructor();
    constructor(element: HTMLElement);
    // overload
    constructor(...args: any[]) {
        // constructor();
        // constructor(element: HTMLElement);
        super(args.length === 0 || !(args[0] instanceof HTMLDivElement) ? document.createElement("div") : args[0]);
        this.setLayout(new JSBorderLayout());
    }
    init(): void {
        this.addClass("JSSplitPaneLeftContainer");
    }
}