/// <reference path = "../jsuis.ts"/>
class JSCheckBox extends JSHTMLComponent {
    
    constructor();
    constructor(element: HTMLInputElement);
    // overload
    constructor(element?: HTMLInputElement) {
        // constructor();
        // constructor(element: HTMLInputElement);
        super(element === undefined ? document.createElement("input") : element);
        this.setAttribute("type", "checkbox");
    }
    init(): void {
        this.addClass("JSCheckBox");
    }
}
