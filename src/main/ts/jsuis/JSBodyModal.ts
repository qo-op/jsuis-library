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
    constructor() {
        // constructor();
        // constructor(element: HTMLElement);
        super(arguments.length === 0 || !(arguments[0] instanceof HTMLDivElement) ? document.createElement("div") : arguments[0]);
        this.setUI("JSBodyModal");
        this.setStyle("display", "none");
        this.setStyle("position", "fixed"); this.setX(0); this.setY(0); this.setStyle("width", "100%"); this.setStyle("height", "100%");
        this.setBackground("rgba(0, 0, 0, 0.5)");
    }
}