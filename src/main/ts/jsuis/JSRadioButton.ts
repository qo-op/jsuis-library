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
    constructor() {
        // constructor();
        // constructor(element: HTMLElement);
        super(arguments.length === 0 || !(arguments[0] instanceof HTMLInputElement) ? document.createElement("input") : arguments[0]);
        this.setAttribute("type", "radio");
        this.setUI("JSRadioButton");
        switch (arguments.length) {
        case 1:
            // constructor(selected: boolean);
            if (typeof arguments[0] === "boolean") {
                var selected: boolean = arguments[0];
                this.setAttribute("checked", "" + selected);
            }
            break;
        default:
        }
    }
}
