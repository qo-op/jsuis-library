/// <reference path = "../jsuis.ts"/>
/**
 * JSSpan
 * 
 * @author Yassuo Toda
 */
class JSSpan extends JSHTMLComponent {
    
    constructor();
    constructor(element: HTMLSpanElement);
    // overload
    constructor(...args: any[]) {
        super(args.length === 0 || !(args[0] instanceof HTMLSpanElement) ? document.createElement("span") : args[0]);
        this.setClass("JSSpan");
    }
}