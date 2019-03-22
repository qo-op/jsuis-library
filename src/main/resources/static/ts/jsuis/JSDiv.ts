/// <reference path = "../jsuis.ts"/>
class JSDiv extends JSHTMLComponent {
    
    constructor();
    constructor(element: HTMLDivElement);
    // overload
    constructor(element?: HTMLDivElement) {
        // constructor();
        // constructor(element: HTMLDivElement);
        super(element === undefined ? document.createElement("div") : element);
    }
    init(): void {
        this.addClass("JSDiv");
    }
}