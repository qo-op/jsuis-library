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
    constructor(...args: any[]) {
        // constructor();
        // constructor(element: HTMLElement);
        super(args.length === 0 || !(args[0] instanceof HTMLTableElement) ? document.createElement("table") : args[0]);
        this.setUI("JSTableHeader");
    }
}
