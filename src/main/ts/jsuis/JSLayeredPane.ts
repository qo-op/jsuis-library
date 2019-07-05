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
    constructor() {
        // constructor();
        // constructor(element: HTMLElement);
        super(arguments.length === 0 || !(arguments[0] instanceof HTMLDivElement) ? document.createElement("div") : arguments[0]);
        this.setUI("JSLayeredPane");
        switch (arguments.length) {
        case 1:
            // constructor(layout: JSLayout);
            if (arguments[0] instanceof JSLayout) {
                var layout: JSLayout = arguments[0];
                this.setLayout(layout);
            }
            break;
        default:
        }
    }
}