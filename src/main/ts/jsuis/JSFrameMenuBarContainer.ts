/// <reference path = "../jsuis.ts"/>
/**
 * JSFrameMenuBarContainer
 * 
 * @author Yassuo Toda
 */
class JSFrameMenuBarContainer extends JSPanel {
    
    constructor();
    constructor(element: HTMLElement);
    // overload
    constructor() {
        // constructor();
        // constructor(element: HTMLElement);
        super(arguments.length === 0 || !(arguments[0] instanceof HTMLDivElement) ? document.createElement("div") : arguments[0]);
        this.setUI("JSFrameMenuBarContainer");
    }
}