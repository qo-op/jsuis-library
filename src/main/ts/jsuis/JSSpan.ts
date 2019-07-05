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
    constructor() {
        // constructor();
        // constructor(element: HTMLElement);
        super(arguments.length === 0 || !(arguments[0] instanceof HTMLSpanElement) ? document.createElement("span") : arguments[0]);
        this.setUI("JSSpan");
    }
}