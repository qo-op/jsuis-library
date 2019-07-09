/// <reference path = "../jsuis.ts"/>
/**
 * JSTreeCellLabelGraphics
 * 
 * @author Yassuo Toda
 */
class JSTreeCellLabelGraphics extends JSGraphics {
    
    constructor();
    constructor(element: HTMLElement);
    // overload
    constructor() {
        // constructor();
        // constructor(element: HTMLElement);
        super(arguments.length === 0 || !(arguments[0] instanceof HTMLDivElement) ? document.createElement("div") : arguments[0]);
        this.setUI("JSTreeCellLabelGraphics");
    }
}
