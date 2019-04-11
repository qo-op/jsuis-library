/// <reference path = "../jsuis.ts"/>
/**
 * JSRadioButton
 * 
 * @author Yassuo Toda
 */
class JSRadioButton extends JSHTMLComponent {
    
    constructor();
    constructor(element: HTMLInputElement);
    constructor(selected: boolean);
    // overload
    constructor(...args: any[]) {
        super(args.length === 0 || !(args[0] instanceof HTMLInputElement) ? document.createElement("input") : args[0]);
        this.setAttribute("type", "radio");
        switch (args.length) {
        case 0:
            // constructor();
            break;
        case 1:
            // constructor(element: HTMLInputElement);
            // constructor(selected: boolean);
            if (args[0] instanceof HTMLInputElement) {
            } else if (typeof args[0] === "boolean") {
                var selected: boolean = args[0];
                this.setAttribute("checked", "" + selected);
            }
            break;
        default:
        }
        this.setClass("JSRadioButton");
    }
}
