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
    constructor(...args: any[]) {
        // constructor();
        // constructor(element: HTMLElement);
        super(args.length === 0 || !(args[0] instanceof HTMLLabelElement) ? document.createElement("label") : args[0]);
        this.setUI("JSLabelText");
    }
}