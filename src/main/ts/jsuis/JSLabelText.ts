/// <reference path = "../jsuis.ts"/>
/**
 * JSLabelText
 * 
 * @author Yassuo Toda
 */
class JSLabelText extends JSHTMLComponent {
    
    constructor();
    constructor(element: HTMLElement);
    // overload
    constructor() {
        // constructor();
        // constructor(element: HTMLElement);
        super(arguments.length === 0 || !(arguments[0] instanceof HTMLLabelElement) ? document.createElement("label") : arguments[0]);
        this.setUI("JSLabelText");
    }
}