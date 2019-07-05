/// <reference path = "../jsuis.ts"/>
/**
 * JSParagraph
 * 
 * @author Yassuo Toda
 */
class JSParagraph extends JSHTMLComponent {
    
    constructor();
    constructor(element: HTMLElement);
    constructor(text: string);
    constructor(text: string, horizontalAlignment: string);
    // overload
    constructor() {
        // constructor();
        // constructor(element: HTMLElement);
        super(arguments.length === 0 || !(arguments[0] instanceof HTMLParagraphElement) ? document.createElement("p") : arguments[0]);
        this.setUI("JSParagraph");
        switch (arguments.length) {
        case 1:
            // constructor(text: string);
            if (typeof arguments[0] === "string") {
                var text: string = arguments[0];
                this.setText(text);
            }
            break;
        case 2:
            // constructor(text: string, horizontalAlignment: string);
            if (typeof arguments[0] === "string" && typeof arguments[1] === "string") {
                var text: string = arguments[0];
                var horizontalAlignment: string = arguments[1];
                this.setText(text);
                this.setStyle("text-align", horizontalAlignment);
            }
            break;
        default:
        }
    }
}