/// <reference path = "../jsuis.ts"/>
/**
 * JSTabLabel
 * 
 * @author Yassuo Toda
 */
class JSTabLabel extends JSLabel {
    
    constructor();
    constructor(element: HTMLElement);
    // overload
    constructor(...args: any[]) {
        // constructor();
        // constructor(element: HTMLElement);
        super(args.length === 0 || !(args[0] instanceof HTMLDivElement) ? document.createElement("div") : args[0]);
        this.setUI("JSTabLabel");
    }
}
