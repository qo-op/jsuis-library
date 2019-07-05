/// <reference path = "../jsuis.ts"/>
/**
 * JSFrameContentPane
 * 
 * @author Yassuo Toda
 */
class JSFrameContentPane extends JSPanel {
    
    constructor();
    constructor(element: HTMLElement);
    // overload
    constructor() {
        // constructor();
        // constructor(element: HTMLElement);
        super(arguments.length === 0 || !(arguments[0] instanceof HTMLDivElement) ? document.createElement("div") : arguments[0]);
        this.setUI("JSFrameContentPane");
        this.setLayout(new JSBorderLayout());
    }
}