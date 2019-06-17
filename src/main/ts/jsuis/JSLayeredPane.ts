/// <reference path = "../jsuis.ts"/>
/**
 * JSLayeredPane
 * 
 * @author Yassuo Toda
 */
class JSLayeredPane extends JSPanel {
    
    constructor();
    constructor(element: HTMLElement);
    constructor(layout: JSLayout);
    // overload
    constructor(...args: any[]) {
        // constructor();
        // constructor(element: HTMLElement);
        super(args.length === 0 || !(args[0] instanceof HTMLDivElement) ? document.createElement("div") : args[0]);
        this.setUI("JSLayeredPane");
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
    }
}