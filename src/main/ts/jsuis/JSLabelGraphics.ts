/// <reference path = "../jsuis.ts"/>
/**
 * JSLabelGraphics
 * 
 * @author Yassuo Toda
 */
class JSLabelGraphics extends JSGraphics {
    
    constructor();
    constructor(element: HTMLElement);
    // overload
    constructor() {
        // constructor();
        // constructor(element: HTMLElement);
        super(arguments.length === 0 || !(arguments[0] instanceof HTMLDivElement) ? document.createElement("div") : arguments[0]);
        this.setUI("JSLabelGraphics");
        this.setAlign(JSBorderLayout.CENTER);
        this.setStyle("display", "none");
    }
}
