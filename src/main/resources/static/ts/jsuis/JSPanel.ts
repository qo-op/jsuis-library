/// <reference path = "../jsuis.ts"/>
/**
 * JSPanel
 * 
 * @author Yassuo Toda
 */
class JSPanel extends JSHTMLComponent {
    
    constructor();
    constructor(element: HTMLDivElement);
    constructor(layout: JSLayout);
    // overload
    constructor(...args: any[]) {
        super(args.length === 0 || !(args[0] instanceof HTMLDivElement) ? document.createElement("div") : args[0]);
        switch (args.length) {
        case 0:
            // constructor();
            break;
        case 1:
            // constructor(element: HTMLDivElement);
            // constructor(layout: JSLayout);
            if (args[0] instanceof HTMLDivElement) {
            } else if (args[0] instanceof JSLayout) {
                var layout: JSLayout = args[0];
                this.setLayout(layout);
            }
            break;
        default:
        }
        this.setClass("JSPanel");
        this.setStyle("display", "inline-block");
        this.setStyle("font-size", "0");
    }
}