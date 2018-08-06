/// <reference path = "../jsuis.ts"/>
class JSSpan extends JSHTMLComponent {
    
    constructor();
    constructor(element: HTMLSpanElement);
    // overload
    constructor(element?: HTMLSpanElement) {
        // constructor();
        // constructor(element: HTMLSpanElement);
        super(element === undefined ? document.createElement("span") : element);
    }
    init(): void {
        this.addClass("JSSpan");
    }
}