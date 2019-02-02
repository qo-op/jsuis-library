/// <reference path = "../jsuis.ts"/>
class JSPanel extends JSHTMLComponent {
    
    constructor();
    constructor(element: HTMLDivElement);
    constructor(layout: JSLayout);
    // overload
    constructor(elementOrLayout?: HTMLDivElement | JSLayout) {
        // constructor();
        // constructor(element: HTMLDivElement);
        super(elementOrLayout === undefined || !(elementOrLayout instanceof HTMLDivElement) ? document.createElement("div") : elementOrLayout);
        if (elementOrLayout !== undefined && !(elementOrLayout instanceof HTMLDivElement)) {
            // constructor(layout: JSLayout);
            this.setLayout(elementOrLayout);
        }
        this.setStyle("display", "inline-block");
        this.setStyle("font-size", "0");
    }
    init(): void {
        this.addClass("JSPanel");
    }
}