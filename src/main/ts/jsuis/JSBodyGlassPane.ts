/// <reference path = "../jsuis.ts"/>
/**
 * JSBodyGlassPane
 * 
 * @author Yassuo Toda
 */
class JSBodyGlassPane extends JSPanel {
    
    constructor();
    constructor(element: HTMLElement);
    // overload
    constructor() {
        // constructor();
        // constructor(element: HTMLElement);
        super(arguments.length === 0 || !(arguments[0] instanceof HTMLDivElement) ? document.createElement("div") : arguments[0]);
        this.setUI("JSBodyGlassPane");
        this.setStyle("display", "none");
    }
}