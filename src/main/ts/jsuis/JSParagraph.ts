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
    constructor(...args: any[]) {
        // constructor();
        // constructor(element: HTMLElement);
        super(args.length === 0 || !(args[0] instanceof HTMLParagraphElement) ? document.createElement("p") : args[0]);
        this.setUI("JSParagraph");
        switch (args.length) {
        case 1:
            // constructor(text: string);
            if (typeof args[0] === "string") {
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
}