/// <reference path = "../jsuis.ts"/>
/**
 * JSSpan
 * 
 * @author Yassuo Toda
 */
class JSSpan extends JSHTMLComponent {
    
    constructor();
    constructor(element: HTMLElement);
    // overload
    constructor(...args: any[]) {
        // constructor();
        // constructor(element: HTMLElement);
        super(args.length === 0 || !(args[0] instanceof HTMLSpanElement) ? document.createElement("span") : args[0]);
        this.setUI("JSSpan");
    }
}