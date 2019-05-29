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
    constructor(...args: any[]) {
        // constructor();
        // constructor(element: HTMLElement);
        super(args.length === 0 || !(args[0] instanceof HTMLLabelElement) ? document.createElement("label") : args[0]);
        this.setStyle("vertical-align", "middle");
    }
    init(): void {
        this.addClass("JSMenuItemLabel");
    }
}
