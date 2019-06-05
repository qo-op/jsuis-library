/// <reference path = "../jsuis.ts"/>
/**
 * JSBodyDialogContainer
 * 
 * @author Yassuo Toda
 */
class JSBodyDialogContainer extends JSPanel {
    
    constructor();
    constructor(element: HTMLElement);
    // overload
    constructor(...args: any[]) {
        // constructor();
        // constructor(element: HTMLElement);
        super(args.length === 0 || !(args[0] instanceof HTMLDivElement) ? document.createElement("div") : args[0]);
        // this.setStyle("display", "none");
        this.setStyle("position", "fixed");
        // this.setStyle("z-index", "1");
        this.setStyle("left", "0");
        this.setStyle("top", "0");
        this.setStyle("width", "100%");
        this.setStyle("height", "100%");
        this.setStyle("background-color", "rgba(0,0,0,0.5)");
    }
    init(): void {
        this.addClass("JSBodyDialogContainer");
    }
}