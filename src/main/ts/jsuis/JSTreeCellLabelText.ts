/// <reference path = "../jsuis.ts"/>
/**
 * JSTreeCellLabelText
 * 
 * @author Yassuo Toda
 */
class JSTreeCellLabelText extends JSHTMLComponent {
    
    constructor();
    constructor(element: HTMLElement);
    // overload
    constructor() {
        // constructor();
        // constructor(element: HTMLElement);
        super(arguments.length === 0 || !(arguments[0] instanceof HTMLLabelElement) ? document.createElement("label") : arguments[0]);
        this.setUI("JSTreeCellLabelText");
    }
}