/// <reference path = "../jsuis.ts"/>
/**
 * JSBodyFrameContainer
 * 
 * @author Yassuo Toda
 */
class JSBodyFrameContainer extends JSPanel {
    
    constructor();
    constructor(element: HTMLElement);
    // overload
    constructor() {
        // constructor();
        // constructor(element: HTMLElement);
        super(arguments.length === 0 || !(arguments[0] instanceof HTMLDivElement) ? document.createElement("div") : arguments[0]);
        this.setUI("JSBodyFrameContainer");
        this.setLayout(new JSBorderLayout());
    }
}