/// <reference path = "../jsuis.ts"/>
/**
 * JSToolBar
 * 
 * @author Yassuo Toda
 */
class JSToolBar extends JSHTMLComponent {
    
    constructor();
    constructor(element: HTMLDivElement);
    // overload
    constructor(...args: any[]) {
        super(args.length === 0 || !(args[0] instanceof HTMLDivElement) ? document.createElement("div") : args[0]);
        this.setClass("JSToolBar");
        // this.setBackground("#f2f2f2");
    }
    addSeparator(): void {
        var separator = new JSPanel();
        separator.setWidth(8);
        this.add(separator);
    }
}