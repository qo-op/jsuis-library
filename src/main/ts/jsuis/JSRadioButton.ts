/// <reference path = "../jsuis.ts"/>
/**
 * JSRadioButton
 * 
 * @author Yassuo Toda
 */
class JSRadioButton extends JSHTMLComponent {
    
    constructor();
    constructor(element: HTMLElement);
    constructor(selected: boolean);
    // overload
    constructor(...args: any[]) {
        // constructor();
        // constructor(element: HTMLElement);
        super(args.length === 0 || !(args[0] instanceof HTMLInputElement) ? document.createElement("input") : args[0]);
        this.setAttribute("type", "radio");
        this.setUI("JSRadioButton");
        switch (args.length) {
        case 1:
            // constructor(selected: boolean);
            if (typeof args[0] === "boolean") {
                var selected: boolean = args[0];
                this.setAttribute("checked", "" + selected);
            }
            break;
        default:
        }
    }
}
