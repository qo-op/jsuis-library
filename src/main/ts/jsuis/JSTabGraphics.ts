/// <reference path = "../jsuis.ts"/>
/**
 * JSTabGraphics
 * 
 * @author Yassuo Toda
 */
class JSTabGraphics extends JSGraphics {
    
    constructor();
    constructor(element: HTMLElement);
    // overload
    constructor(...args: any[]) {
        // constructor();
        // constructor(element: HTMLElement);
        super(args.length === 0 || !(args[0] instanceof HTMLDivElement) ? document.createElement("div") : args[0]);
        this.setStyle("vertical-align", "middle");
    }
    init(): void {
        this.addClass("JSTabGraphics");
    }
}