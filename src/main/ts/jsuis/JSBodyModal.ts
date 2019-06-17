/// <reference path = "../jsuis.ts"/>
/**
 * JSBodyModal
 * 
 * @author Yassuo Toda
 */
class JSBodyModal extends JSPanel {
    
    constructor();
    constructor(element: HTMLElement);
    // overload
    constructor(...args: any[]) {
        // constructor();
        // constructor(element: HTMLElement);
        super(args.length === 0 || !(args[0] instanceof HTMLDivElement) ? document.createElement("div") : args[0]);
        this.setUI("JSBodyModal");
        this.setStyle("display", "none");
    }
}