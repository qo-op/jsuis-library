/// <reference path = "../jsuis.ts"/>
/**
 * JSButtonSpan
 * 
 * @author Yassuo Toda
 */
class JSButtonSpan extends JSSpan {
    
    constructor();
    constructor(element: HTMLElement);
    // overload
    constructor(...args: any[]) {
        // constructor();
        // constructor(element: HTMLElement);
        super(args.length === 0 || !(args[0] instanceof HTMLSpanElement) ? document.createElement("span") : args[0]);
        this.setUI("JSButtonSpan");
    }
}
