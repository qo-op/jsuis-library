/// <reference path = "../jsuis.ts"/>
/**
 * JSGraphics
 * 
 * @author Yassuo Toda
 */
class JSGraphics extends JSHTMLComponent {
    
    constructor();
    constructor(element: HTMLDivElement);
    // overload
    constructor(...args: any[]) {
        super(args.length === 0 || !(args[0] instanceof HTMLDivElement) ? document.createElement("div") : args[0]);
    }
    init(): void {
        this.addClass("JSGraphics");
    }
}