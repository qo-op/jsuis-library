/// <reference path = "../jsuis.ts"/>
/**
 * JSPopupMenuContainer
 * 
 * @author Yassuo Toda
 */
class JSPopupMenuContainer extends JSPanel {
    
    constructor();
    constructor(element: HTMLElement);
    // overload
    constructor(...args: any[]) {
        // constructor();
        // constructor(element: HTMLElement);
        super(args.length === 0 || !(args[0] instanceof HTMLDivElement) ? document.createElement("div") : args[0]);
        // this.setStyle("display", "block");
    }
    init(): void {
        this.addClass("JSPopupMenuContainer");
    }
}