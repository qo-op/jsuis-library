/// <reference path = "../jsuis.ts"/>
/**
 * JSDiv
 * 
 * @author Yassuo Toda
 */
class JSDiv extends JSHTMLComponent {
    
    constructor();
    constructor(element: HTMLDivElement);
    // overload
    constructor(...args: any[]) {
        super(args.length === 0 || !(args[0] instanceof HTMLDivElement) ? document.createElement("div") : args[0]);
        this.setClass("JSDiv");
    }
}