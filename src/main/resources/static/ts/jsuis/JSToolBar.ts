/// <reference path = "../jsuis.ts"/>
class JSToolBar extends JSHTMLComponent {
    
    constructor();
    constructor(element: HTMLDivElement);
    // overload
    constructor(element?: HTMLDivElement) {
        // constructor();
        // constructor(element: HTMLDivElement);
        super(element === undefined ? document.createElement("div") : element);
    }
    init(): void {
        this.addClass("JSToolBar");
	    this.setBackground("#f2f2f2");
    }
    addSeparator(): void {
        var separator = new JSPanel();
        separator.setWidth(8);
        this.add(separator);
    }
}