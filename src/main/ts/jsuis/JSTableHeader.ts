/// <reference path = "../jsuis.ts"/>
/**
 * JSTableHeader
 * 
 * @author Yassuo Toda
 */
class JSTableHeader extends JSTableContent {
    
    constructor();
    constructor(element: HTMLElement);
    // overload
    constructor() {
        // constructor();
        // constructor(element: HTMLElement);
        super(arguments.length === 0 || !(arguments[0] instanceof HTMLTableElement) ? document.createElement("table") : arguments[0]);
        this.setUI("JSTableHeader");
    }
}
