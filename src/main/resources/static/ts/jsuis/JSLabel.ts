/// <reference path = "../jsuis.ts"/>
class JSLabel extends JSHTMLComponent {

    constructor();
    constructor(element: HTMLLabelElement);
    constructor(text: string);
    constructor(text: string, horizontalAlignment: string);
    // overload
    constructor(elementOrText?: HTMLLabelElement | string, horizontalAlignment?: string) {
        // constructor();
        // constructor(element: HTMLLabelElement);
        super(elementOrText === undefined || !(elementOrText instanceof HTMLLabelElement) ? document.createElement("label") : elementOrText);
        if (elementOrText !== undefined && !(elementOrText instanceof HTMLLabelElement)) {
            // constructor(text: string);
            // constructor(text: string, horizontalAlignment: string);
            this.setText(elementOrText);
            if (horizontalAlignment !== undefined) {
                this.setStyle("text-align", horizontalAlignment);
            }
        }
        // this.setStyle("display", "inline-block");
        this.setStyle("font-size", "medium");
        this.setStyle("white-space", "nowrap");
    }
    init(): void {
        this.addClass("JSLabel");
    }
    getFor(): string {
        return this.getAttribute("for");
    }
    setFor(id: string) {
        this.setAttribute("for", id);
    }
}