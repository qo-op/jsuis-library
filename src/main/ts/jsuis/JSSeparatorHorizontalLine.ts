/// <reference path = "../jsuis.ts"/>
/**
 * JSSeparatorHorizontalLine
 * 
 * @author Yassuo Toda
 */
class JSSeparatorHorizontalLine extends JSPanel {
    
    constructor();
    constructor(element: HTMLElement);
    // overload
    constructor(...args: any[]) {
        // constructor();
        // constructor(element: HTMLElement);
        super(args.length === 0 || !(args[0] instanceof HTMLDivElement) ? document.createElement("div") : args[0]);
        this.setStyle("display", "block");
    }
    init(): void {
        this.addClass("JSSeparatorHorizontalLine");
    }
}