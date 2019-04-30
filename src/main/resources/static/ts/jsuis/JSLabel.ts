/// <reference path = "../jsuis.ts"/>
/**
 * JSLabel
 * 
 * @author Yassuo Toda
 */
class JSLabel extends JSHTMLComponent {

    constructor();
    constructor(element: HTMLLabelElement);
    constructor(text: string);
    constructor(text: string, horizontalAlignment: string);
    // overload
    constructor(...args: any[]) {
        super(args.length === 0 || !(args[0] instanceof HTMLLabelElement) ? document.createElement("label") : args[0]);
        this.setClass("JSLabel");
        this.setStyle("font-size", "medium");
        this.setStyle("white-space", "nowrap");
        switch (args.length) {
        case 0:
            // constructor();
            break;
        case 1:
            // constructor(element: HTMLLabelElement);
            // constructor(text: string);
            if (args[0] instanceof HTMLLabelElement) {
            } else if (typeof args[0] === "string") {
                var text: string = args[0];
                this.setText(text);
            }
            break;
        case 2:
            // constructor(text: string, horizontalAlignment: string);
            if (typeof args[0] === "string" && typeof args[1] === "string") {
                var text: string = args[0];
                var horizontalAlignment: string = args[1];
                this.setText(text);
                this.setStyle("text-align", horizontalAlignment);
            }
            break;
        default:
        }
    }
    getFor(): string {
        return this.getAttribute("for");
    }
    setFor(id: string) {
        this.setAttribute("for", id);
    }
}