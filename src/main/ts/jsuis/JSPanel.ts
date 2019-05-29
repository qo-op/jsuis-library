/// <reference path = "../jsuis.ts"/>
/**
 * JSPanel
 * 
 * @author Yassuo Toda
 */
class JSPanel extends JSHTMLComponent {
    
    constructor();
    constructor(element: HTMLElement);
    constructor(layout: JSLayout);
    // overload
    constructor(...args: any[]) {
        // constructor();
        // constructor(element: HTMLElement);
        super(args.length === 0 || !(args[0] instanceof HTMLDivElement) ? document.createElement("div") : args[0]);
        switch (args.length) {
        case 1:
            // constructor(layout: JSLayout);
            if (args[0] instanceof JSLayout) {
                var layout: JSLayout = args[0];
                this.setLayout(layout);
            }
            break;
        default:
        }
        this.setStyle("display", "inline-block");
    }
    init(): void {
        this.addClass("JSPanel");
    }
}