/// <reference path = "../jsuis.ts"/>
/**
 * JSSeparatorVerticalLine
 * 
 * @author Yassuo Toda
 */
class JSSeparatorVerticalLine extends JSPanel {
    
    constructor();
    constructor(element: HTMLElement);
    // overload
    constructor(...args: any[]) {
        // constructor();
        // constructor(element: HTMLElement);
        super(args.length === 0 || !(args[0] instanceof HTMLDivElement) ? document.createElement("div") : args[0]);
        this.setStyle("height", "100%");
    }
    init(): void {
        this.addClass("JSSeparatorVerticalLine");
    }
}