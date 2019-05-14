/// <reference path = "../jsuis.ts"/>
/**
 * JSTabbedPaneCardContainer
 * 
 * @see JSTabbedPane
 * 
 * @author Yassuo Toda
 */
class JSTabbedPaneCardContainer extends JSPanel {
    
    constructor();
    constructor(element: HTMLDivElement);
    // overload
    constructor(...args: any[]) {
        super(args.length === 0 || !(args[0] instanceof HTMLDivElement) ? document.createElement("div") : args[0]);
    }
    init(): void {
        this.addClass("JSTabbedPaneCardContainer");
        this.setLayout(new JSCardLayout());
    }
}