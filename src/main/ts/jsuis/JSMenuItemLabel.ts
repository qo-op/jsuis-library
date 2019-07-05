/// <reference path = "../jsuis.ts"/>
/**
 * JSMenuItemLabel
 * 
 * @author Yassuo Toda
 */
class JSMenuItemLabel extends JSLabel {
    
    constructor();
    constructor(element: HTMLElement);
    // overload
    constructor() {
        // constructor();
        // constructor(element: HTMLElement);
        super(arguments.length === 0 || !(arguments[0] instanceof HTMLDivElement) ? document.createElement("div") : arguments[0]);
        this.setUI("JSMenuItemLabel");
    }
}
